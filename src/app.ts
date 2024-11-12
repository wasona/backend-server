import { initOptions } from "@init/db";
import { loadCourse, unloadCourses } from "@init/init-db/courses";
import { createServerConfig } from "@init/server-config";
import { createServerState } from "@init/server-state";
import { createRouter } from "@routes/index";
import { handleErrors } from "@routes/middleware/error-handling";
import { profileTime } from "@routes/middleware/timing";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { initNodeCron } from "jobs/cron";
import pgPromise from "pg-promise";

/*
 * Initialize the connection pool here.
 */
const initStartTime = Date.now();
const pgp = pgPromise(initOptions); // Initialize pg-promise
const serverConfig = createServerConfig();
const connection = {
  connectionString: serverConfig.getPgDatabaseConnStr(),
  allowExitOnIdle: false,
};

// create and export the database connection pool to be used across the app
export const db = pgp(connection);

async function initializeServer() {
  try {
    await unloadCourses();
    console.log("Courses unloaded");
    await loadCourse("courses/course-eng-tok/");
    console.log("Course loaded");

    const serverState = await createServerState(serverConfig);

    // Initialize job scheduler
    await initNodeCron();

    // Initialize the Express application
    const app = express();

    // Use middleware:
    // * to parse incoming JSON requests
    app.use(express.json());
    // * to parse URL-encoded data with the querystring library (extended: true uses the qs library instead)
    app.use(express.urlencoded({ extended: true }));
    // * to enable CORS
    app.use(cors());
    // * to automatically populate req.cookies
    app.use(cookieParser());

    // Use the router; passing serverState to the routes
    app.use("/", profileTime);
    app.use("/", createRouter(serverState));
    app.use("/", handleErrors);

    // host port, server name, etc
    app.listen(serverState.serverConfig.hostPort, () => {
      const initEndTime = Date.now();
      const initDurationMs = initEndTime - initStartTime;
      const initDurationSec = (initDurationMs / 1000).toFixed(2);
      console.log(
        `${serverState.serverConfig.serverName} is running on http://localhost:${serverState.serverConfig.hostPort}`,
      );
      console.log(
        `Server initialized in ${initDurationMs} ms (${initDurationSec} s)`,
      );
    });
  } catch (error) {
    console.error("Failed to initialize server state:", error);
    process.exit(1); // Exit the process with an error code
  }
}

initializeServer(); // Start the initialization process
