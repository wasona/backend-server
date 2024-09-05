import { Router, Request, Response } from "express";
import { db } from "../../app";
import { Iso639 } from "../../models/db_models/iso-639";
import { ServerState } from "../../models/app_models/server_state_model";

export function getAllIso639(
  req: Request,
  res: Response,
  serverState: ServerState,
) {
  try {
    // Returning the JSON response with the list of Iso639 instances from serverState
    return res.json({ iso639List: serverState.iso639List });
  } catch (error) {
    // Catching and logging any error that occurs
    console.log("ERROR:", error);
    // Returning a 500 Internal Server Error response in case of an error
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
