import { Router, Request, Response, NextFunction } from "express";
import signup from "@controllers/auth/signup";
import getDatabaseVersion from "@controllers/healthcheck/db";
import getAllIso639 from "@controllers/iso-639/get-all";
import { ServerState } from "@models/app/server_state_model"; // Adjust import if necessary
import healthcheckApp from "@controllers/healthcheck/app";
import login from "@controllers/auth/login";
import profileTime from "./middleware/timing";

export default function createRouter(serverState: ServerState) {
  let handler = (fn: Function) => {
    // Wrapper function needed for:
    // * Making sure function returns void
    // * Forwarding errors to the error handler
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next, serverState)).catch(next);
    };
  };

  return (
    Router()
      // basic server healthcheck
      .get("/healthcheck/app", handler(healthcheckApp))

      // database healthcheck
      .get("/healthcheck/db", handler(getDatabaseVersion))

      // signup
      .post("/auth/signup", handler(signup))

      // TODO: confirmation email
      // TODO: delete users if they don't reply within 24 hours
      // TODO: email verification related controllers
      // TODO: OAuth

      // login
      .post("/auth/login", handler(login))

      // get all iso-639 codes
      .get("/iso-639/get-all", handler(getAllIso639))
  );
}
