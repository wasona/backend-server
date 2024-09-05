const initStartTime = Date.now();
import express, { Request, Response } from "express"; // le web framework
import serverConfig from "./init/server_config"; // initialize and bring over server config

/*
 * Initialize the connection pool here.
 */

const pgp = require("pg-promise")(); // Import and initialize pg-promise library
const connection = {
  // class method to get us the string from disparate loaded env. vars. hardcoding bad -jyh
  connectionString: serverConfig.getPgDatabaseConnStr(),
  // drops connections when idle.
  // setting this to 'true' might be advantageous when there are a lot of backend servers vying for DB connections to relieve congestion.
  // not the case for ours; we'll keep our connections hot. -jyh
  allowExitOnIdle: false,
};
export const db = pgp(connection); // create and export the database connection pool to be used across the app

const Iso639List = fetchIso639List(db);
export const serverState = createServerState(serverConfig, Iso639List);

// Initialize the Express application
const app: express.Application = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data with the querystring library (extended: true uses the qs library instead)
app.use(express.urlencoded({ extended: true }));

// Use the router
import router from "./controllers/index"; // import the default export 'router' at /src/controllers/index.ts
import { createServerState } from "./init/server_state";
import { Iso639 } from "./models/db_models/iso-639";
import { fetchIso639List } from "./init/init_from_db/iso_639";
app.use("/", router);

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
