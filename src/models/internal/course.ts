import { Lesson } from "@models/internal/lesson";
import { z } from "zod";

export const Course = z
  .object({
    source_language: z.string(),
    target_language: z.string(),
    lessons: z.array(Lesson),
  })
  .strict();

export type CourseT = z.infer<typeof Course>;
