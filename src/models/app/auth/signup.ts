import { z } from "zod";

export const SignupRequestSchema = z
  .object({
    userEmail: z.string().email(),
    userPw: z.string(),
    userName: z.string(),
    userPhone: z.string(),
    userCountry: z.string().length(3), // bpchar(3)
    userSubnational: z.string(),
  })
  .strict(); // denote rejection of unknown fields this way
