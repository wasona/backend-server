import { z } from "zod";

export const RefreshTokenRequestSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();
