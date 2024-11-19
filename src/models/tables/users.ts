import { z } from "zod";

export const Users = z
  .object({
    user_id: z.string().uuid(),
    user_invitee_id: z.string().uuid().nullable().optional(),
    user_authority_id: z.number().optional(),
    user_email: z.string(),
    user_pw: z.string(),
    user_name: z.string(),
    user_phone: z.string(),
    user_country: z.string(),
    user_verified: z.boolean().optional(),
    user_status: z.boolean().optional(),
    user_login_attempts_left: z.number().optional(),
    user_created_at: z.date().optional(),
    user_updated_at: z.date().optional(),
    user_subnational: z.string(),
  })
  .strict();

export type UsersT = z.infer<typeof Users>;
