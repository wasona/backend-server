import { Countries, CountriesT } from "@models/tables/countries";
import { Temporal } from "temporal-polyfill";

export async function fetchCountriesList(db: any): Promise<CountriesT[]> {
  const startTime = Temporal.Now.instant().epochMilliseconds;
  let data;
  try {
    data = await db.any("SELECT * FROM v1.countries;");
  } catch (error) {
    console.error("Database Query Error:", error);
    throw new Error("Internal Server Error");
  }

  if (!Array.isArray(data)) {
    console.error("Expected an array but received:", data);
    throw new Error("Data is not an array");
  }

  const countriesList = data.map((item: any) => Countries.parse(item));

  const endTime = Temporal.Now.instant().epochMilliseconds;
  console.log(`Countries initiated in ${endTime - startTime}ms`);
  return countriesList;
}
