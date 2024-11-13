import { z } from "zod";

export const TaskAnswerRequestSchema = z
  .object({
    taskId: z.string(),
    reply: z.string(),
  })
  .strict();
