import { db } from "@app";
import { ApiResponseCode } from "@models/app/api/response-code";
import { SignupRequestSchema } from "@models/app/auth/signup";
import { ServerState } from "@models/app/server-state";
import { apiError, apiSuccess } from "@utils/api/respond";
import { getUserByEmail } from "@utils/db/get-user";
import { readQuery } from "@utils/fs/read-query";
import { normalizeEmail } from "@utils/normalize/email";
import { hashPassword } from "@utils/normalize/hash-password";
import { normalizePhoneNumber } from "@utils/normalize/phone-number";
import { validatePhoneNumber } from "@utils/validate/phone-number";
import { NextFunction, Request, Response } from "express";
const signupQuery = readQuery("@queries/auth/signup.sql");
const findEmail = readQuery("@queries/auth/find-email.sql");

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Validate the request body
  const body = SignupRequestSchema.parse(req.body);

  // TODO: Validate username

  // Validate phone number
  if (!validatePhoneNumber(body.userPhone)) {
    return apiError(res, 400, ApiResponseCode.PhoneValidationFailed);
  }

  // TODO: Validate country code
  // TODO: Validate subnational

  // Normalise params
  const params = [
    normalizeEmail(body.userEmail),
    await hashPassword(body.userPw),
    body.userName,
    normalizePhoneNumber(body.userPhone),
    body.userCountry,
    body.userSubnational,
  ];

  // TODO: Check if user already exists
  if ((await getUserByEmail(params[0])) != undefined) {
    return apiError(res, 400, ApiResponseCode.UserAlreadyExists);
  }

  // Insert into database
  const data = await db.one(signupQuery, params);

  // Return without hashed password
  const { user_pw, ...userWithoutPassword } = data;

  serverState.transporter
    .sendMail({
      from: "Wasona Authorisation <auth@noreply.wasona.com>",
      to: normalizeEmail(body.userEmail),
      subject: "Confirm your email address",
      text: "This is where we will attach a link with an email confirmation token.",
    })
    .catch((error) => {
      // It takes too long to send an email, so we would
      // rather let user try again, rather than keep them
      // waiting. Hence, no apiError
      console.log("Sending mail failed!", error);
    });

  return apiSuccess(res, 200, userWithoutPassword);
}
