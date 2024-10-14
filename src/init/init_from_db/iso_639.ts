import { Iso_639, Iso_639T } from "@models/db/iso-639";

export default async function fetchIso639List(db: any): Promise<Iso_639T[]> {
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
    const parseResult = Iso_639.safeParse(item);
    if (!parseResult.success) {
      console.error("Item validation failed:", parseResult.error);
      throw new Error("Validation Error");
    }

    return parseResult.data;
  });

  const endTime = Date.now();
  console.log(`Iso639List initiated in ${endTime - startTime}ms`);
  return iso639List;
}
