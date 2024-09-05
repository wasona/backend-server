import { Iso639 } from "../../models/db_models/iso-639";

export function fetchIso639List(db: any): Iso639[] {
  const startTime = Date.now();
  try {
    const data = db.any("SELECT * FROM v1.iso_639;");
    const iso639List = data.map((item: any) => {
      try {
        return new Iso639(
          item.iso_639_2,
          item.iso_639_english_name,
          item.iso_639_korean_name,
          item.iso_639_1 || null,
        );
      } catch (error) {
        console.log("Validation ERROR:", error);
        throw new Error("Validation Error");
      }
    });
    const endTime = Date.now();
    console.log(`Iso639List initiated in ${endTime - startTime}ms`);
    return iso639List;
  } catch (error) {
    console.log("ERROR:", error);
    throw new Error("Internal Server Error");
  }
}
