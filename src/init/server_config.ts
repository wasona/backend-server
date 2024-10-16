// initializes and exports server config as loaded from .env and potentially other sources like the DB.
// sometimes you just want to get relatively invariable stuff from the DB and hold it for perf. reasons if hardcoding in code is still undesirable. -jyh
import dotenv from "dotenv";
dotenv.config(); // load them all

import { generateKeyPair, exportJWK, exportPKCS8 } from 'jose';
import { existsSync, writeFileSync } from "fs";

// this is where the server configuration's shape is defined as a class, and the possible types of databases defined as an enum. -jyh
import {
  ServerConfig,
  ServerState,
  DbType,
} from "@models/app/server_state_model";

// we're going to push as much of the utility functions out of the way into /src/util_functions
import {
  getDatabaseType,
  getEnvVariable,
  getKeyFromEnvVariable,
  getServerPort,
} from "@utils/env_var/get_env_var";

// checks if key files are there or not and generates them using jose if not
async function ensureKeyFiles() {
  const privateKeyPath = getEnvVariable("PRIVATE_KEY_PATH");
  const publicKeyPath = getEnvVariable("PUBLIC_KEY_PATH");

  if (!existsSync(privateKeyPath) || !existsSync(publicKeyPath)) {
    const { privateKey, publicKey } = await generateKeyPair('RS256');

    const privateKeyExport = await exportPKCS8(privateKey);
    const publicKeyExport = await exportPKCS8(publicKey);

    // Save keys to files as plain strings
    writeFileSync(privateKeyPath, privateKeyExport);
    writeFileSync(publicKeyPath, publicKeyExport);

    console.log('New key pair generated and saved.');
  } else {
    console.log('Key files already exist.');
  }
}

// holy - there's no way to have field names be visible in TS class constructors? -jyh
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
  getKeyFromEnvVariable("PRIVATE_KEY_PATH"),
  getKeyFromEnvVariable("PUBLIC_KEY_PATH"),
);

export default serverConfig;
