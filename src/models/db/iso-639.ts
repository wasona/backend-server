// this should mirror the DB table's structure for the stuff we want to load wholesale, or partially.
// there are typically tools to automate code generation for rdbms-backend structure mirroring.
// validation for all server-db interactions all the time, always -jyh
import { z } from "zod";

export const Iso_639 = z.object({
  iso_639_2: z.string(),
  iso_639_english_name: z.string(),
  iso_639_korean_name: z.string(),
  iso_639_1: z.string().nullable().optional(),
});

export type Iso_639T = z.infer<typeof Iso_639>;
