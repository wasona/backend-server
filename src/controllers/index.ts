import { login } from "@controllers/auth/login";
import { refreshToken } from "@controllers/auth/refresh-token";
import { signup } from "@controllers/auth/signup";
import { verifyEmail } from "@controllers/auth/verify-email";
import { healthcheckApp } from "@controllers/healthcheck/app";
import { getDatabaseVersion } from "@controllers/healthcheck/db";
import { getAllIso639 } from "@controllers/iso-639/get-all";
import { ServerState } from "@models/internal/server-state";
import { NextFunction, Request, Response, Router } from "express";

export function createRouter(serverState: ServerState) {
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

      // verify email
      .get("/auth/verify-email", handler(verifyEmail))

      // refresh token
      .post("/auth/refresh-token", handler(refreshToken))

      // get all iso-639 codes
      .get("/iso-639/get-all", handler(getAllIso639))
  );
}
