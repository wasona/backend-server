import { Router, Request, Response } from "express";
import signup from "@controllers/auth/signup";
import validateSignupRequest from "@models/app/auth/signup";
import getDatabaseVersion from "@controllers/healthcheck/db";
import getAllIso639 from "@controllers/iso-639/get-all";
import { ServerState } from "@models/app/server_state_model"; // Adjust import if necessary
import healthcheckApp from "@controllers/healthcheck/app";

export default function createRouter(serverState: ServerState) {
  const router = Router();

  // basic server healthcheck
  router.get("/healthcheck/app", (req: Request, res: Response) => {
    healthcheckApp(req, res, serverState);
  });

  // database healthcheck
  router.get("/healthcheck/db", getDatabaseVersion);

  // signup
  router.post("/auth/signup", validateSignupRequest, signup);

  // get all iso-639 codes
  router.get("/iso-639/get-all", (req: Request, res: Response) => {
    getAllIso639(req, res, serverState);
  });

  return router;
}
