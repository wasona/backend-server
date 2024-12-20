import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { VerifyEmailRequestSchema } from "@models/request/auth/verify-email";
import { UserLogTypes } from "@models/tables/user-log-types";
import { apiError, apiSuccess } from "@utils/internal/respond";
import {
  isUserTokenAlreadyUsed,
  isUserTokenExpired,
} from "@utils/validate/user-token";
import { NextFunction, Request, Response } from "express";

export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Validate the request body
  const body = VerifyEmailRequestSchema.parse(req.body);
  // #1 extract the token from the query parameter of the request (let's just have the key be called 'id')
  const id = body.id;

  // query the DB's user_tokens table to see if any row with that PKEY exists
  let userToken = await db.userTokens.read(body.id);
  console.log("verifyEmail found user token", userToken);
  // if not, error
  if (!userToken) {
    return apiError(res, 400, ApiResponseCode.UserTokenNotFound);
  }

  // also, check the expiry date on the token itself
  // and separate out an error for that case
  if (isUserTokenExpired(userToken)) {
    // TODO: confirm this comparison works
    return apiError(res, 400, ApiResponseCode.UserTokenExpired);
  }
  // is this step needed?
  if (isUserTokenAlreadyUsed(userToken)) {
    return apiError(res, 400, ApiResponseCode.UserTokenAlreadyUsed);
  }

  // if it does, then update the users table's row using the FKEY in the user_tokens row
  // user_verified to true
  await db.users.updateVerified(userToken.user_id);
  await db.userTokens.updateUsed(userToken.user_token_id);
  await db.userLogs.create(userToken.user_id, UserLogTypes.VERIFY_EMAIL);

  // verified
  return apiSuccess(res, 200);
}
