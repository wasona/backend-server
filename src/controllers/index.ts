import { Router, Request, Response, NextFunction } from "express";
import signup from "@controllers/auth/signup";
import getDatabaseVersion from "@controllers/healthcheck/db";
import getAllIso639 from "@controllers/iso-639/get-all";
import { ServerState } from "@models/app/server_state_model"; // Adjust import if necessary
import healthcheckApp from "@controllers/healthcheck/app";
import login from "@controllers/auth/login";
import profileTime from "./middleware/timing";

export default function createRouter(serverState: ServerState) {
  let stateless = (fn: Function) => {
    return async (...args: [Request, Response, NextFunction]) => {
      await fn(...args);
    };
  };
  let stateful = (fn: Function) => {
    return async (...args: [Request, Response, NextFunction]) => {
      await fn(...args, serverState);
    };
  };

  return (
    Router()
      // basic server healthcheck
      .get("/healthcheck/app", stateful(healthcheckApp))

      // database healthcheck
      .get("/healthcheck/db", stateless(getDatabaseVersion))

      // signup
      .post("/auth/signup", stateless(signup))

      // TODO: confirmation email
      // TODO: delete users if they don't reply within 24 hours
      // TODO: email verification related controllers
      // TODO: OAuth

      // login
      .post("/auth/login", stateless(login))

      // get all iso-639 codes
      .get("/iso-639/get-all", stateful(getAllIso639))
  );
}
