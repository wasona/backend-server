import { CountriesT } from "@models/tables/countries";

export function validateCountryCode(
  countryCode: string,
  countriesList: CountriesT[],
): boolean {
  const countryCodes: string[] = countriesList.map(
    (country: CountriesT) => country.country_iso_3166_1_alpha3,
  );
  return countryCodes.includes(countryCode);
}
