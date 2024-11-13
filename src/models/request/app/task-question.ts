import { z } from "zod";

export const TaskQuestionRequestSchema = z
  .object({
    taskId: z.string(),
  })
  .strict();
