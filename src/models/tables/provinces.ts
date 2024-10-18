import { z } from "zod";

export const Provinces = z.object({});

export type ProvincesT = z.infer<typeof Provinces>;
