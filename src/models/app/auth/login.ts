import { z } from "zod";

export const LoginRequestSchema = z
  .object({
    userEmail: z.string().email(),
    userPw: z.string(),
    keepLoggedIn: z.boolean(),
  })
  .strict();
