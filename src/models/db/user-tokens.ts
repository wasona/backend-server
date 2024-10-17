import { z } from "zod";

export const UserTokens = z.object({
  user_token_id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  user_token_type: z.number(),
  user_token_generated_on: z.string().optional(),
  user_token_expires_on: z.string(),
  user_token_used_on: z.string().nullable().optional(),
});

export type UserTokensT = z.infer<typeof UserTokens>;
