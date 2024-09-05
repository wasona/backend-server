import express, { Request, Response } from "express"; // le web framework
import router from "./controllers/index"; // import the default export 'router' at /src/controllers/index.ts
import serverState from "./init/server_state_config"; // initialize and bring over server config

const pgp = require("pg-promise")(); // Import and initialize pg-promise library
const connection = {
  // class method to get us the string from disparate loaded env. vars. hardcoding bad -jyh
  connectionString: serverState.serverConfig.getPgDatabaseConnStr(),
  // drops connections when idle.
  // setting this to 'true' might be advantageous when there are a lot of backend servers vying for DB connections to relieve congestion.
  // not the case for ours; we'll keep our connections hot. -jyh
  allowExitOnIdle: false,
};

export const db = pgp(connection); // create and export the database connection pool to be used across the app

// Initialize the Express application
const app: express.Application = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data with the querystring library (extended: true uses the qs library instead)
app.use(express.urlencoded({ extended: true }));

// Use the router
app.use("/", router);

// host port, server name, etc
app.listen(serverState.serverConfig.hostPort, () => {
  console.log(
    `${serverState.serverConfig.serverName} is running on http://localhost:${serverState.serverConfig.hostPort}`,
  );
});
