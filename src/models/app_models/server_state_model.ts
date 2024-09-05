export enum DbType {
  PostgreSQL = "postgresql",
  MySQL = "mysql",
  SQLite = "sqlite",
}

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
  ) {}

  public getPgDatabaseConnStr(): string {
    if (this.dbType !== DbType.PostgreSQL) {
      throw new Error("Database type is not PostgreSQL");
    }
    return `postgresql://${this.dbUser}:${this.dbPword}@${this.dbHost}:${this.dbPort}/${this.dbName}`;
  }
}

export class ServerState {
  constructor(public serverConfig: ServerConfig) {}
}
