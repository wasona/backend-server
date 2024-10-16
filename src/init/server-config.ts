// initializes and exports server config as loaded from .env and potentially other sources like the DB.
// sometimes you just want to get relatively invariable stuff from the DB and hold it for perf. reasons if hardcoding in code is still undesirable. -jyh
import dotenv from "dotenv";
dotenv.config(); // load them all

import { generateKeyPair, exportJWK, exportPKCS8 } from "jose";
import { existsSync, mkdirSync, writeFileSync } from "fs";

// this is where the server configuration's shape is defined as a class, and the possible types of databases defined as an enum. -jyh
import { ServerConfig } from "@models/app/server-state";

// we're going to push as much of the utility functions out of the way into /src/util_functions
import {
  getDatabaseType,
  getEnvVariable,
  getKeyFromEnvVariable,
  getServerPort,
} from "@utils/env-var/get-env-var";
import { generateKeyPairSync } from "crypto";

// checks if key files are there or not and generates them using jose if not

// create directories recursively along the path if they do not exist.
function ensureDir(path: string) {
  const dir = path.substring(0, path.lastIndexOf("/"));
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return path;
}

export function ensureKeyFiles() {
  const privateKeyPath = ensureDir(getEnvVariable("PRIVATE_KEY_PATH"));
  const publicKeyPath = ensureDir(getEnvVariable("PUBLIC_KEY_PATH"));

  if (!existsSync(privateKeyPath) || !existsSync(publicKeyPath)) {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: getEnvVariable("PRIVATE_KEY_PASSPHRASE"),
      },
    });

    // Save keys to files
    writeFileSync(privateKeyPath, privateKey);
    writeFileSync(publicKeyPath, publicKey);

    console.log("New key pair generated and saved.");
  } else {
    console.log("Key files already exist.");
  }
}

// holy - there's no way to have field names be visible in TS class constructors? -jyh
// anyway, server config initializing here; ServerConfig class and DbType enum defined in
// /src/models/app_models
export function createServerConfig() {
  return new ServerConfig(
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
}
