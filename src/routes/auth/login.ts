import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { LoginRequestSchema } from "@models/request/auth/login";
import { UserLogTypes } from "@models/tables/user-log-types";
import { UserTokenTypes } from "@models/tables/user-token-types";
import { createJWT } from "@utils/generate/web-token";
import { apiError, apiSuccess } from "@utils/internal/respond";
import { normalizeEmail } from "@utils/normalize/email";
import { validatePasswordHash } from "@utils/validate/password";
import { NextFunction, Request, Response } from "express";

const LOGIN_COOKIE_EXPIRES_IN_DAYS = 1;
const REFRESH_LOGIN_TOKEN_EXPIRES_IN_DAYS = 1;

export async function login(req: Request, res: Response, next: NextFunction) {
  // #1 extract IP and user-agent from header to persist to log
  const ipAddr = req.headers["x-forwarded-for"];
  const userAgent = req.headers["user-agent"];
  console.log(ipAddr, userAgent);

  // Validate the request body
  let body = LoginRequestSchema.parse(req.body);
  body.userEmail = normalizeEmail(body.userEmail);

  // #2 check if the email/id exists at all by querying DB
  let user = await db.users.getByEmail(body.userEmail);
  if (!user) {
    return apiError(res, 400, ApiResponseCode.UserEmailNotFound);
  }

  // #3 check if the user is verified (email-verified)
  if (!user.user_verified) {
    return apiError(res, 400, ApiResponseCode.UserNotVerified);
  }

  // #4 check if the user has valid login attempts left (five wrong password inputs and you get your account disabled)
  if (user.user_login_attempts_left == 0) {
    return apiError(res, 400, ApiResponseCode.UserOutOfLoginAttempts);
  }

  // #5 check the password hash (there were branches on this depending on whether they were active or had their email verified)
  if (!(await validatePasswordHash(user.user_pw, body.userPw))) {
    return apiError(res, 400, ApiResponseCode.PasswordDoesNotMatch);
  }

  // #6 generate and issue the appropriate JWT
  const jwt = await createJWT(user.user_id);

  // Put as cookie
  const expiryTime = new Date();
  expiryTime.setDate(expiryTime.getDate() + LOGIN_COOKIE_EXPIRES_IN_DAYS);
  res.cookie("login", jwt, { httpOnly: true, expires: expiryTime });
  // get a cookie: req.cookies['cookie-name']

  // #7 generate and issue the appropriate refresh token
  await db.userTokens.add(
    user.user_id,
    UserTokenTypes.REFRESH_LOGIN,
    REFRESH_LOGIN_TOKEN_EXPIRES_IN_DAYS,
  );

  // #8 log the login event asynchronously
  await db.userLogs.add(user.user_id, UserLogTypes.LOGIN);

  // #9 in the case of success, refill their login attempts quota
  return apiSuccess(res, 200, { jwt: jwt });
}
