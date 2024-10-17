import { apiSuccess } from "@utils/api/respond";
import { NextFunction, Request, Response } from "express";

export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // verified
  return apiSuccess(res, 200);
}
