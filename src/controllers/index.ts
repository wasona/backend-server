import { Router, Request, Response } from "express";
import serverState from "../init/server_state_config";
import { getDatabaseVersion } from "./healthcheck/db";
import { getAllIso639 } from "./iso-639/get-iso-639";

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

export default router;
