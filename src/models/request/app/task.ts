import { z } from "zod";

export const TasksRequestSchema = z
  .object({
    lessonId: z.string(),
  })
  .strict();
