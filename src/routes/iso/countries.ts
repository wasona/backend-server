import { db } from "@app";
import { ServerState } from "@models/internal/server-state";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getCountries(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  const countries = await db.countries.readAll();
  return apiSuccess(res, 200, countries);
}
