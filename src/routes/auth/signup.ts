import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { ServerState } from "@models/internal/server-state";
import { SignupRequestSchema } from "@models/request/auth/signup";
import { UserLogTypes } from "@models/tables/user-log-types";
import { UserTokenTypes } from "@models/tables/user-token-types";
import { UsersT } from "@models/tables/users";
import { getUserByEmail } from "@utils/db/get-user";
import { logUserAction } from "@utils/db/log-user-action";
import { setUserToken } from "@utils/db/set-user-token";
import { sendMail } from "@utils/generate/mail";
import { readQuery } from "@utils/internal/read-query";
import { apiError, apiSuccess } from "@utils/internal/respond";
import { normalizeEmail } from "@utils/normalize/email";
import { hashPassword } from "@utils/normalize/hash-password";
import { normalizePhoneNumber } from "@utils/normalize/phone-number";
import { validateCountryCode } from "@utils/validate/country-code";
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
  if (!validateCountryCode(body.userCountry, serverState.countriesList)) {
    return apiError(res, 400, ApiResponseCode.CountryCodeValidationFailed);
  }

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

  // Create user token for email verification
  const userToken = setUserToken(
    user.user_id,
    UserTokenTypes.EMAIL_VALIDATE,
    EMAIL_VALIDATION_DAY_LIMIT,
  );
  // TODO: replace with a link to the frontend.
  const emailLink = `https://api.wasona.com/auth/verify-email?id=${userToken}`;

  // Send email with verification link
  sendMail(serverState.transporter, {
    from: "Wasona Authorisation <auth@noreply.wasona.com>",
    to: body.userEmail,
    subject: "Confirm your email address",
    text: `You have just registered on Wasona. Please click the following link to verify your email address. \n\n${emailLink}`,
  });

  logUserAction(user.user_id, UserLogTypes.SIGNUP);

  // Return without hashed password
  const { user_pw, ...userWithoutPassword } = user;
  return apiSuccess(res, 200, userWithoutPassword);
}
