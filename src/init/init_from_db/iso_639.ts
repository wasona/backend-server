import { Iso639 } from "../../models/db_models/iso-639";

export async function fetchIso639List(db: any): Promise<Iso639[]> {
  const startTime = Date.now();
  let data;
  try {
    data = await db.any("SELECT * FROM v1.iso_639;");
  } catch (error) {
    console.error("Database Query Error:", error);
    throw new Error("Internal Server Error");
  }

  if (!Array.isArray(data)) {
    console.error("Expected an array but received:", data);
    throw new Error("Data is not an array");
  }

  const iso639List = data.map((item: any) => {
    if (
      typeof item.iso_639_2 !== "string" ||
      typeof item.iso_639_english_name !== "string" ||
      typeof item.iso_639_korean_name !== "string"
    ) {
      console.error("Item validation failed:", item);
      throw new Error("Validation Error");
    }

    return new Iso639(
      item.iso_639_2,
      item.iso_639_english_name,
      item.iso_639_korean_name,
      item.iso_639_1 || null,
    );
  });

  const endTime = Date.now();
  console.log(`Iso639List initiated in ${endTime - startTime}ms`);
  return iso639List;
}
