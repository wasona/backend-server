import { z } from "zod";

export const VerifyEmailRequestSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();
