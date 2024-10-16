import { Router, Request, Response, NextFunction } from "express";
import { db } from "@app";
import { ServerState } from "@models/app/server_state_model";
import { apiSuccess, apiErrorGeneric } from "@utils/api/respond";

export default async function getAllIso639(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  try {
    // Returning the JSON response with the list of Iso639 instances from serverState
    return apiSuccess(res, 200, "ISO 639 codes found successfully", {
      iso639List: serverState.iso639List,
    });
  } catch (error) {
    next(error);
  }
}
