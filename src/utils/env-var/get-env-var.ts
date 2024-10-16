import { ensureKeyFiles } from "@init/server-config";
import { DbType } from "@models/app/server-state";
import { readFile, readFileSync } from "fs";

// TS is shockingly lax with error handling, but we're gonna do it anyway (hopefully) -jyh
export function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Environment variable ${name} is required but not defined.`,
    );
  }
  return value;
}

// get .env string for DB_TYPE and make sure it's in the enum
export function getDatabaseType(): DbType {
  const dbTypeStr = getEnvVariable("DB_TYPE").toLowerCase();
  switch (dbTypeStr) {
    case DbType.PostgreSQL:
    case DbType.MySQL:
    case DbType.SQLite:
      return dbTypeStr as DbType;
    default:
      throw new Error(`Invalid DB_TYPE value: ${dbTypeStr}`);
  }
}

// get .env string for HOST_PORT and check for validity
// gonna take a while to get used to JS/TS stl function names -jyh
export function getServerPort(): number {
  const serverPortStr = getEnvVariable("HOST_PORT");
  const serverPort = parseInt(serverPortStr, 10);
  if (isNaN(serverPort) || serverPort < 1 || serverPort > 65535) {
    throw new Error(`Invalid HOST_PORT value: ${serverPortStr}`);
  }
  return serverPort;
}

// reads key from filepath as supplied by env. var (reads string, really)
export function getKeyFromEnvVariable(envVarName: string): Uint8Array {
  const keyPath: string = getEnvVariable(envVarName);

  try {
    const key: string = readFileSync(keyPath, 'utf8');
    const secretKey = new TextEncoder().encode(key);

    return secretKey;
  } catch (err) {
    console.error('Error reading file:', err);
    console.log("Initializing keys...");
    ensureKeyFiles();

    const key: string = readFileSync(keyPath, 'utf8');
    const secretKey = new TextEncoder().encode(key);

    return secretKey;
  }
}