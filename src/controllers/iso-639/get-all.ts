import { Request, Response, NextFunction } from "express";
import { ServerState } from "@models/app/server-state";
import { apiSuccess } from "@utils/api/respond";

export async function getAllIso639(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Returning the JSON response with the list of Iso639 instances from serverState
  return apiSuccess(res, 200, {
    iso639List: serverState.iso639List,
  });
}
