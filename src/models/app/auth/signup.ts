import { z } from "zod";

export const SignupRequestSchema = z
  .object({
    userEmail: z.string(),
    userPw: z.string(),
    userName: z.string(),
    userPhone: z.string(),
    userCountry: z.string().length(2), // bpchar(2)
    userSubnational: z.string(),
  })
  .strict(); // denote rejection of unknown fields this way
