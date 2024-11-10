import { z } from "zod";

export const LessonsRequestSchema = z
  .object({
    course: z.string(),
  })
  .strict();
