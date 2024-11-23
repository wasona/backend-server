import { db } from "@app";
import { ServerState } from "@models/internal/server-state";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getLanguages(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  const languages = await db.languages.readAll();
  return apiSuccess(res, 200, languages);
}
