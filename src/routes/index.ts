import { ServerState } from "@models/internal/server-state";
import { getCourses } from "@routes/app/courses";
import { getLessons } from "@routes/app/lessons";
import { taskAnswer } from "@routes/app/task-answer";
import { taskQuestion } from "@routes/app/task-question";
import { getTasks } from "@routes/app/tasks";
import { login } from "@routes/auth/login";
import { refreshToken } from "@routes/auth/refresh-token";
import { signup } from "@routes/auth/signup";
import { verifyEmail } from "@routes/auth/verify-email";
import { healthcheckApp } from "@routes/healthcheck/app";
import { getDatabaseVersion } from "@routes/healthcheck/db";
import { getCountries } from "@routes/iso/countries";
import { getLanguages } from "@routes/iso/languages";
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
      // redirect root to github to avoid anyone getting
      // confused at api.wasona.com being "down"
      // if we ever document the routes, redirect to docs
      .get("/", (_, res) => {
        res.redirect("https://github.com/wasona/backend-server");
      })

      // basic server healthcheck
      .get("/healthcheck/app", handler(healthcheckApp))

      // database healthcheck
      .get("/healthcheck/db", handler(getDatabaseVersion))

      // signup
      .post("/auth/signup", handler(signup))

      // TODO: OAuth

      // login
      .post("/auth/login", handler(login))

      // verify email
      .get("/auth/verify-email", handler(verifyEmail))

      // refresh token
      .get("/auth/refresh-token", handler(refreshToken))

      // get all iso-639 codes
      .get("/iso/languages", handler(getLanguages))

      // get all iso-639 codes
      .get("/iso/countries", handler(getCountries))

      // get courses
      .get("/app/courses", handler(getCourses))

      // get lessons
      .get("/app/lessons", handler(getLessons))

      // get tasks
      .get("/app/tasks", handler(getTasks))

      // task: get question
      .get("/app/task-question", handler(taskQuestion))

      // task: get answer
      .get("/app/task-answer", handler(taskAnswer))
  );
}
