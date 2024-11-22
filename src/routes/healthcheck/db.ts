import { db } from "@app";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getDatabaseVersion(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // you use 'one' when only one row is expected to be returned
  let data = await db.one("SELECT VERSION();");
  return apiSuccess(res, 200, data.version);
}
