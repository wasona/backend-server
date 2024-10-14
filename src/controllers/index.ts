import { Router, Request, Response } from "express";
import { signup } from "@controllers/auth/signup";
import validateSignupRequest from "@models/app/auth/signup";
import { getDatabaseVersion } from "@controllers/healthcheck/db";
import { getAllIso639 } from "@controllers/iso-639/get-all";
import { ServerState } from "@models/app/server_state_model"; // Adjust import if necessary
import { time } from "@utils/performance/timing";
import { apiSuccess, apiErrorGeneric } from "@utils/api/respond";

export default function createRouter(serverState: ServerState) {
  const router = Router();

  // basic server healthcheck
  router.get("/healthcheck", time, (req: Request, res: Response) => {
    try {
      const message = `${serverState.serverConfig.serverName} up and good to go!`;
      return apiSuccess(res, 400, message);
    } catch (error) {
      apiErrorGeneric(res, error as Error);
    }
  });

  // database healthcheck
  router.get("/healthcheck/db", time, (req: Request, res: Response) => {
    return getDatabaseVersion(req, res);
  });

  // signup
  router.post(
    "/auth/signup",
    time,
    validateSignupRequest,
    (req: Request, res: Response) => {
      return signup(req, res);
    },
  );

  // get all iso-639 codes
  router.get("/iso-639/get-all", time, (req: Request, res: Response) => {
    return getAllIso639(req, res, serverState);
  });

  return router;
}
