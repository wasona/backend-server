import { ApiResponseCode } from "@models/app/api/response-code";
import { LoginRequestSchema } from "@models/app/auth/login";
import { apiError, apiSuccess } from "@utils/api/respond";
import { getUserByEmail } from "@utils/db/get-user";
import { createJWT } from "@utils/generate/jwt";
import { normalizeEmail } from "@utils/normalize/email";
import { validatePasswordHash } from "@utils/validate/password";
import { NextFunction, Request, Response } from "express";

export async function login(req: Request, res: Response, next: NextFunction) {
  // #1 extract IP and user-agent from header to persist to log
  const ipAddr = req.headers["x-forwarded-for"];
  const userAgent = req.headers["user-agent"];
  console.log(ipAddr, userAgent);

  // validate body schema
  const body = LoginRequestSchema.parse(req.body);

  // #2 check if the email/id exists at all by querying DB
  let user = await getUserByEmail(normalizeEmail(body.userEmail));
  if (!user) {
    return apiError(res, 400, ApiResponseCode.UserEmailNotFound);
  }
  user = user!;

  // #3 check if the user is verified (email-verified)
  // if (!user.user_verified) {
  // return apiError(res, 400, ApiResponseCode.UserNotVerified);
  // }

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

  // #7 generate and issue the appropriate refresh token
  // #8 log the login event asynchronously
  console.log(`/auth/login: generated jwt token ${jwt}`);
  // #9 in the case of success, refill their login attempts quota
  return apiSuccess(res, 200, { jwt: jwt });
}
