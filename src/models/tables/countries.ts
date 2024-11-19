import { z } from "zod";

export const Countries = z
  .object({
    country_iso_3166_1_alpha3: z.string(),
    country_iso_3166_1_alpha2: z.string(),
    country_iso_3166_1_numeric: z.number(),
    country_name_toki_pona: z.string().nullable().optional(),
    country_name_english: z.string().nullable().optional(),
    country_name_native: z.string().nullable().optional(),
    country_e_164: z.number().nullable().optional(),
    country_language: z.string().nullable().optional(),
    country_flag_emoji: z.string().nullable().optional(),
    country_is_independent: z.boolean().optional(),
  })
  .strict();

export type CountriesT = z.infer<typeof Countries>;
