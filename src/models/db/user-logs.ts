import { z } from "zod";

export const UserLogs = z.object({
  user_log_id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  user_log_type: z.number(),
  user_log_generated_on: z.string().optional(),
});

export type UserLogsT = z.infer<typeof UserLogs>;
