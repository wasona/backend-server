// this should mirror the DB table's structure for the stuff we want to load wholesale, or partially.
// there are typically tools to automate code generation for rdbms-backend structure mirroring.
// validation for all server-db interactions all the time, always -jyh
import { z } from "zod";

export const Language = z.object({
  language_iso_639_3: z.string(),
  language_name_english: z.string(),
});

export type LanguageT = z.infer<typeof Language>;
