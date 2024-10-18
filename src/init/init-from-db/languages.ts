import { Language, LanguageT } from "@models/tables/languages";

export async function fetchLanguagesList(db: any): Promise<LanguageT[]> {
  const startTime = Date.now();
  let data;
  try {
    data = await db.any("SELECT * FROM v1.languages;");
  } catch (error) {
    console.error("Database Query Error:", error);
    throw new Error("Internal Server Error");
  }

  if (!Array.isArray(data)) {
    console.error("Expected an array but received:", data);
    throw new Error("Data is not an array");
  }

  const languagesList = data.map((item: any) => Language.parse(item));

  const endTime = Date.now();
  console.log(`Languages initiated in ${endTime - startTime}ms`);
  return languagesList;
}
