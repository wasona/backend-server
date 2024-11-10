import { z } from "zod";

export const TasksRequestSchema = z
  .object({
    course: z.string(),
    lessonId: z.number().int().min(0),
  })
  .strict();
