import { Course } from "@models/internal/course";
import { CountriesT } from "@models/tables/countries";
import { LanguageT as LanguagesT } from "@models/tables/languages";
import { Transporter } from "nodemailer";

// possible database types and their string equivalents. just lowercase everything -jyh
export enum DbType {
  PostgreSQL = "postgresql",
  MySQL = "mysql",
  SQLite = "sqlite",
}

// class structure defined with types concerning server configuration as loaded from .env
export class ServerConfig {
  constructor(
    public serverName: string, // not from .env

    public dbHost: string,
    public dbPort: string,
    public hostPort: number,

    public dbType: DbType,
    public dbName: string,
    public dbUser: string,
    public dbPword: string,

    public privateKey: Uint8Array | undefined,
    public publicKey: Uint8Array | undefined,
    // passphrase not included; it is read during key generation

    public smtpEndpoint: string,
    public smtpServerUsername: string,
    public smtpServerPassword: string,
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
    public languagesList: LanguagesT[],
    public countriesList: CountriesT[],
    public transporter: Transporter,
    public courses: Course[],
  ) {}
}
