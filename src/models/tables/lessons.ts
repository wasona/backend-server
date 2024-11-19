import { z } from "zod";

export const Lessons = z
  .object({
    lesson_id: z.string().uuid(),
    lesson_course: z.string().uuid(),
    lesson_index: z.number().int().min(0),
    lesson_title: z.string(),
  })
  .strict();

export type LessonsT = z.infer<typeof Lessons>;
