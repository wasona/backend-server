import { z } from "zod";

export const UserLogTypes = z.object({
  user_log_type_id: z.number().optional(),
  user_log_type_str: z.string(),
});

export type UserLogTypesT = z.infer<typeof UserLogTypes>;
