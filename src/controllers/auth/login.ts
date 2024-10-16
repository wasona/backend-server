import readQuery from "@utils/fs/read_query";
import { NextFunction, Request, Response } from "express";
import { db } from "@app";
import { apiError, apiErrorGeneric, apiSuccess } from "@utils/api/respond";
import { Users } from "@models/db/users";
import { LoginRequestSchema } from "@models/app/auth/login";
import validatePasswordHash from "@utils/validate/password";
import { ZodError } from "zod";
const findEmail = readQuery("@queries/auth/find-email.sql");

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // #1 extract IP and user-agent from header to persist to log
    const ipAddr = req.headers["x-forwarded-for"];
    const userAgent = req.headers["user-agent"];
    console.log(ipAddr, userAgent);

    // validate body schema
    const body = LoginRequestSchema.parse(req.body);

    // #2 check if the email/id exists at all by querying DB
    let data = await db.any(findEmail, body.userEmail);
    if (data.length == 0) {
      return apiError(res, 400, "User email not found");
    }

    // ideally, the db should only contain 1 user of any given email,
    // but i haven't done that yet
    data = data[0];

    // parse db row as ts type
    let user = Users.parse(data);

    // #3 check if the user is verified (email-verified)
    if (!user.user_verified) {
      return apiError(res, 400, "User not verified");
    }

    // #4 check if the user has valid login attempts left (five wrong password inputs and you get your account disabled)
    if (user.user_login_attempts_left == 0) {
      return apiError(res, 400, "User has no login attempts left");
    }

    // #5 check the password hash (there were branches on this depending on whether they were active or had their email verified)
    if (!(await validatePasswordHash(user.user_pw, body.userPw))) {
      return apiError(res, 400, "Password does not match");
    }

    // #6 generate and issue the appropriate JWT
    // #7 generate and issue the appropriate refresh token
    // #8 log the login event asynchronously
    // #9 in the case of success, refill their login attempts quota
    return apiSuccess(res, 200, "Login successful");
  } catch (error) {
    next(error);
  }
}
