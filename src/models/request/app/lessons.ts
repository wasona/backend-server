import { z } from "zod";

export const LessonsRequestSchema = z
  .object({
    courseId: z.string(),
  })
  .strict();
