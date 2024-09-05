import { Router, Request, Response } from "express";
import { getDatabaseVersion } from "./healthcheck/db";
import { getAllIso639 } from "./iso-639/get-iso-639";
import { ServerState } from "../models/app_models/server_state_model"; // Adjust import if necessary

const createRouter = (serverState: ServerState) => {
  const router = Router();

  router.get("/healthcheck", (req: Request, res: Response) => {
    res.send(`${serverState.serverConfig.serverName} up and good to go!`);
  });

  router.get("/healthcheck/db", (req: Request, res: Response) => {
    return getDatabaseVersion(req, res);
  });

  router.get("/iso-639/get-all", (req: Request, res: Response) => {
    return getAllIso639(req, res);
  });

  return router;
};

export default createRouter;
