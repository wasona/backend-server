import { createRouter } from "@routes/index"; // import the export 'router' at /src/controllers/index.ts
import { handleErrors } from "@routes/middleware/error-handling";
import { profileTime } from "@routes/middleware/timing";
import { createServerConfig } from "@init/server-config"; // initialize and bring over server config
import { createServerState } from "@init/server-state";
import cors from "cors";
import express from "express"; // le web framework
import pgPromise from "pg-promise"; // Import pg-promise library

/*
 * Initialize the connection pool here.
 */
const initStartTime = Date.now();
const pgp = pgPromise(); // Initialize pg-promise
const serverConfig = createServerConfig();
const connection = {
  connectionString: serverConfig.getPgDatabaseConnStr(),
  allowExitOnIdle: false,
};
export const db = pgp(connection); // create and export the database connection pool to be used across the app

async function initializeServer() {
  try {
    const serverState = await createServerState(serverConfig);

    // Initialize the Express application
    const app = express();

    // Use middleware:
    // * to parse incoming JSON requests
    app.use(express.json());
    // * to parse URL-encoded data with the querystring library (extended: true uses the qs library instead)
    app.use(express.urlencoded({ extended: true }));
    // * to enable CORS
    app.use(cors());

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
