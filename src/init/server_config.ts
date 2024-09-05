// initializes and exports server config as loaded from .env and potentially other sources like the DB.
// sometimes you just want to get relatively invariable stuff from the DB and hold it for perf. reasons if hardcoding in code is still undesirable. -jyh
import dotenv from "dotenv";
dotenv.config(); // load them all

// this is where the server configuration's shape is defined as a class, and the possible types of databases defined as an enum. -jyh
import {
  ServerConfig,
  ServerState,
  DbType,
} from "../models/app_models/server_state_model";

// we're going to push as much of the utility functions out of the way into /src/util_functions
import {
  getDatabaseType,
  getEnvVariable,
  getServerPort,
} from "../util_functions/env_var_functions/get_env_var";

// holy fuddles, there's no way to have field names be visible in TS class constructors? -jyh
// anyway, server config initializing here; ServerConfig class and DbType enum defined in
// /src/models/app_models
const serverConfig = new ServerConfig(
  "WPP Backend Server v0.1.0",
  getDatabaseType(),
  getEnvVariable("DB_USER"),
  getEnvVariable("DB_PWORD"),
  getEnvVariable("DB_HOST"),
  getEnvVariable("DB_PORT"),
  getEnvVariable("DB_NAME"),
  getServerPort(),
);
export default serverConfig;
