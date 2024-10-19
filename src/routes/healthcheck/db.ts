import { db } from "@app";
import { readQuery } from "@utils/internal/read-query";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

const selectVersion = readQuery("src/queries/healthcheck/select-version.sql");

export async function getDatabaseVersion(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // you use 'one' when only one row is expected to be returned
  let data = await db.one(selectVersion);
  return apiSuccess(res, 400, { version: data.version });
}
