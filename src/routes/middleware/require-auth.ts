import { ApiResponseCode } from "@models/internal/response-code";
import { apiError } from "@utils/internal/respond";
import { verifyJWT } from "@utils/validate/web-token";
import { NextFunction, Request, Response } from "express";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const payload = await verifyJWT(req);
  if (payload) {
    next();
  } else {
    apiError(res, 400, ApiResponseCode.AuthenticationRequired);
  }
}
