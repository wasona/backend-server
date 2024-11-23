import { Countries, CountriesT } from "@models/tables/countries";
import { IDatabase, IMain } from "pg-promise";

const READ_ALL = `
  SELECT *
  FROM v1.countries
  ORDER BY country_name_english;
`;

export class CountriesRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
    private cached?: CountriesT[],
  ) {}

  private async _readAll(): Promise<CountriesT[]> {
    const countries = await this.db.many(READ_ALL);
    return countries.map((country) => Countries.parse(country));
  }

  // Lazy loaded and cached in memory
  async readAll(): Promise<CountriesT[]> {
    if (!this.cached) {
      this.cached = await this._readAll();
    }
    return this.cached;
  }

  async isValidCode(code: string): Promise<boolean> {
    const countries = await this.readAll();
    const codes = countries.map((country) => country.country_iso_3166_1_alpha3);
    return codes.includes(code);
  }
}
