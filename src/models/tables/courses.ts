import { z } from "zod";

export const Courses = z
  .object({
    course_id: z.string().uuid(),
    course_source_language: z.string(),
    course_target_language: z.string(),
    course_title: z.string(),
  })
  .strict();

export type CoursesT = z.infer<typeof Courses>;
