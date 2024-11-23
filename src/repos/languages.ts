import { Language, LanguageT } from "@models/tables/languages";
import { IDatabase, IMain } from "pg-promise";

const READ_ALL = `SELECT * FROM v1.languages;`;

export class LanguagesRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
    private cached?: LanguageT[],
  ) {}

  private async _readAll(): Promise<LanguageT[]> {
    const languages = await this.db.many(READ_ALL);
    return languages.map((language) => Language.parse(language));
  }

  // Keep loaded in memory
  async readAll(): Promise<LanguageT[]> {
    if (!this.cached) {
      this.cached = await this._readAll();
    }
    return this.cached;
  }
}
