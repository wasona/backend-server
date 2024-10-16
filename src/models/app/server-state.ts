import { LanguageT } from "@models/db/languages";

// possible database types and their string equivalents. just lowercase everything -jyh
export enum DbType {
  PostgreSQL = "postgresql",
  MySQL = "mysql",
  SQLite = "sqlite",
}

// class structure defined with types concerning server configuration as loaded from .env
export class ServerConfig {
  constructor(
    public serverName: string,
    public dbType: DbType,
    public dbUser: string,
    public dbPword: string,
    public dbHost: string,
    public dbPort: string,
    public dbName: string,
    public hostPort: number,
    public privateKey: Uint8Array | undefined,
    public publicKey: Uint8Array | undefined,
  ) {}

  // if dbType is postgreSQL (some apps need to be portable across multiple types of DBs, so best practice)
  public getPgDatabaseConnStr(): string {
    if (this.dbType !== DbType.PostgreSQL) {
      throw new Error("Database type is not PostgreSQL");
    }
    return `postgresql://${this.dbUser}:${this.dbPword}@${this.dbHost}:${this.dbPort}/${this.dbName}`;
  }
}

export class ServerState {
  constructor(
    public serverConfig: ServerConfig,
    public iso639List: LanguageT[],
  ) {}
}
