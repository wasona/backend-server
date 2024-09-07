import { Router, Request, Response } from "express";
import { db } from "../../app";
import { Iso639 } from "../../models/db/iso-639";
import { ServerState } from "../../models/app/server_state_model";

export function getAllIso639(
  req: Request,
  res: Response,
  serverState: ServerState,
) {
  const startTime = process.hrtime(); // Start timing

  try {
    // Returning the JSON response with the list of Iso639 instances from serverState
    return res.json({ iso639List: serverState.iso639List });
  } catch (error) {
    // Catching and logging any error that occurs
    console.log("ERROR:", error);
    // Returning a 500 Internal Server Error response in case of an error
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    const endTime = process.hrtime(startTime); // End timing
    const durationMs = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
    console.log(`getAllIso639 took ${durationMs.toFixed(3)} ms`);
  }
}
