import { Router, Request, Response } from "express";
import { db } from "@app";
import { ServerState } from "@models/app/server_state_model";
import { apiSuccess, apiErrorGeneric } from "@utils/api/respond";

export default function getAllIso639(
  req: Request,
  res: Response,
  serverState: ServerState,
) {
  try {
    // Returning the JSON response with the list of Iso639 instances from serverState
    return apiSuccess(res, 200, "ISO 639 codes found successfully", {
      iso639List: serverState.iso639List,
    });
  } catch (error) {
    apiErrorGeneric(res, error as Error);
  }
}
