import express from "express"; // le web framework
import serverConfig from "@init/server_config"; // initialize and bring over server config
import router from "@controllers/index"; // import the default export 'router' at /src/controllers/index.ts
import createServerState from "@init/server_state";
import fetchIso639List from "@init/init_from_db/iso_639";
import { ServerState } from "@models/app/server_state_model";
import pgPromise from "pg-promise"; // Import pg-promise library
import profileTime from "@utils/performance/timing";

/*
 * Initialize the connection pool here.
 */
const initStartTime = Date.now();
const pgp = pgPromise(); // Initialize pg-promise
const connection = {
  connectionString: serverConfig.getPgDatabaseConnStr(),
  allowExitOnIdle: false,
};
export const db = pgp(connection); // create and export the database connection pool to be used across the app

let serverState: ServerState;

const initializeServer = async () => {
  try {
    const iso639List = await fetchIso639List(db);
    serverState = createServerState(serverConfig, iso639List);

    // Initialize the Express application
    const app: express.Application = express();

    // Middleware to parse incoming JSON requests
    app.use(express.json());
    // Middleware to parse URL-encoded data with the querystring library (extended: true uses the qs library instead)
    app.use(express.urlencoded({ extended: true }));
    // Middleware to enable CORS
    const cors = require("cors");
    app.use(cors());
    // Use the router; passing serverState to the routes
    app.use("/", profileTime);
    app.use("/", router(serverState));

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
};

initializeServer(); // Start the initialization process
