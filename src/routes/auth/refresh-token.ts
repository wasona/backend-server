import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { RefreshTokenRequestSchema } from "@models/request/auth/refresh-token";
import { UserLogTypes } from "@models/tables/user-log-types";
import { UserTokenTypes } from "@models/tables/user-token-types";
import { getUserTokenById } from "@utils/db/get-user-token";
import { apiError, apiSuccess } from "@utils/internal/respond";
import {
  isUserTokenAlreadyUsed,
  isUserTokenExpired,
} from "@utils/validate/user-token";
import { NextFunction, Request, Response } from "express";

const NEW_REFRESH_TOKEN_EXPIRES_IN_DAYS = 1;

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Validate the request body
  const body = RefreshTokenRequestSchema.parse(req.body);
  // #1 extract the token from the query parameter of the request (let's just have the key be called 'id')
  const id = body.id;

  // query the DB's user_tokens table to see if any row with that PKEY exists
  let userToken = await getUserTokenById(body.id);
  console.log("refreshToken found user token", userToken);
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

  const newUserToken = await db.userTokens.add(
    userToken.user_id,
    UserTokenTypes.REFRESH_LOGIN,
    NEW_REFRESH_TOKEN_EXPIRES_IN_DAYS,
  );
  await db.userTokens.setUsed(userToken.user_token_id);
  await db.userLogs.add(userToken.user_id, UserLogTypes.REFRESH_TOKEN);

  // verified
  return apiSuccess(res, 200);
}
