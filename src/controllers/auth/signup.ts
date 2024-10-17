import { db } from "@app";
import { ApiResponseCode } from "@models/app/api/response-code";
import { SignupRequestSchema } from "@models/app/auth/signup";
import { UserTokenTypes } from "@models/db/user-token-types";
import { UsersT } from "@models/db/users";
import { ServerState } from "@models/app/server-state";
import { apiError, apiSuccess } from "@utils/api/respond";
import { getUserByEmail } from "@utils/db/get-user";
import { readQuery } from "@utils/fs/read-query";
import { normalizeEmail } from "@utils/normalize/email";
import { hashPassword } from "@utils/normalize/hash-password";
import { normalizePhoneNumber } from "@utils/normalize/phone-number";
import { validatePhoneNumber } from "@utils/validate/phone-number";
import { randomUUID, UUID } from "crypto";
import { NextFunction, Request, Response } from "express";

const signupQuery = readQuery("@queries/auth/signup.sql");
const findEmail = readQuery("@queries/auth/find-email.sql");
const persistUserToken = readQuery("@queries/auth/persist-email-validation-token.sql")

const EMAIL_VALIDATION_DAY_LIMIT: number = 1;

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
  const user: UsersT = await db.one(signupQuery, params);

  // Generate user_token and persist it to database
  const userTokenId: UUID = randomUUID();
  const genTime = new Date();
  const expiryTime = new Date(genTime);
  expiryTime.setDate(expiryTime.getDate() + EMAIL_VALIDATION_DAY_LIMIT);
  
  const userTokenParams = [
    user.user_id,
    UserTokenTypes.EMAIL_VALIDATE_TOKEN_TYPE,
    genTime.toISOString,
    expiryTime.toISOString,
  ];

  const user_token_id: UUID = await db.one(persistUserToken, userTokenParams);

  // Send email with token id

  // Return without hashed password
  const { user_pw, ...userWithoutPassword } = user;

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
