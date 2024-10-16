import { Router, Request, Response, NextFunction } from "express";
import { db } from "@app";
import { apiErrorGeneric, apiSuccess } from "@utils/api/respond";
import readQuery from "@utils/fs/read-query";
const selectVersion = readQuery("@queries/healthcheck/select-version.sql");

export default async function getDatabaseVersion(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // you use 'one' when only one row is expected to be returned
  let data = await db.one(selectVersion);
  return apiSuccess(res, 400, data.version);
}
