import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { ServerState } from "@models/internal/server-state";
import { SignupRequestSchema } from "@models/request/auth/signup";
import { UserTokenTypes } from "@models/tables/user-token-types";
import { UsersT } from "@models/tables/users";
import { apiError, apiSuccess } from "@utils/api/respond";
import { getUserByEmail } from "@utils/db/get-user";
import { setUserToken } from "@utils/db/set-user-token";
import { readQuery } from "@utils/fs/read-query";
import { sendMail } from "@utils/generate/mail";
import { normalizeEmail } from "@utils/normalize/email";
import { hashPassword } from "@utils/normalize/hash-password";
import { normalizePhoneNumber } from "@utils/normalize/phone-number";
import { validatePhoneNumber } from "@utils/validate/phone-number";
import { NextFunction, Request, Response } from "express";

const signupQuery = readQuery("src/queries/auth/signup.sql");

const EMAIL_VALIDATION_DAY_LIMIT: number = 1;

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Validate the request body
  let body = SignupRequestSchema.parse(req.body);

  // 1: userEmail
  // validation not needed: done by zod
  body.userEmail = normalizeEmail(body.userEmail);

  // 2: userPw
  body.userPw = await hashPassword(body.userPw);

  // 3: userName
  // TODO: sanity-filter user display names. (e.g. discard LTR-markers)

  // 4: userPhone
  // Validate phone number
  if (!validatePhoneNumber(body.userPhone)) {
    return apiError(res, 400, ApiResponseCode.PhoneValidationFailed);
  }
  body.userPhone = normalizePhoneNumber(body.userPhone);

  // 5: userCountry
  // TODO: validate against serverState.countries

  // 6: userSubnational
  // TODO: validate somehow

  // signup: Check if user already exists
  if ((await getUserByEmail(body.userEmail)) != undefined) {
    return apiError(res, 400, ApiResponseCode.UserAlreadyExists);
  }

  // Insert into database
  const user: UsersT = await db.one(signupQuery, [
    body.userEmail,
    body.userPw,
    body.userName,
    body.userPhone,
    body.userCountry,
    body.userSubnational,
  ]);

  // Create user token for email validation
  const userToken = setUserToken(
    user.user_id,
    UserTokenTypes.EMAIL_VALIDATE_TOKEN_TYPE,
    EMAIL_VALIDATION_DAY_LIMIT,
  );

  // Send email with token id
  sendMail(serverState.transporter, {
    from: "Wasona Authorisation <auth@noreply.wasona.com>",
    to: body.userEmail,
    subject: "Confirm your email address",
    text: "This is where we will attach a link with an email confirmation token.",
  });

  // Return without hashed password
  const { user_pw, ...userWithoutPassword } = user;
  return apiSuccess(res, 200, userWithoutPassword);
}
