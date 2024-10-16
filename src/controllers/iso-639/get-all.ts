import { Request, Response, NextFunction } from "express";
import { ServerState } from "@models/app/server-state";
import { apiSuccess, apiErrorGeneric } from "@utils/api/respond";

export async function getAllIso639(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Returning the JSON response with the list of Iso639 instances from serverState
  return apiSuccess(res, 200, "ISO 639 codes found successfully", {
    iso639List: serverState.iso639List,
  });
}
