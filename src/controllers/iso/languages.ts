import { ServerState } from "@models/internal/server-state";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getLanguages(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Returning the JSON response with the list of Iso639 instances from serverState
  return apiSuccess(res, 200, {
    languagesList: serverState.languagesList,
  });
}
