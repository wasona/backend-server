import { Task } from "@models/internal/task";
import { z } from "zod";

export const Lesson = z
  .object({
    title: z.string().optional(),
    task: z.array(Task),
  })
  .strict();

export type LessonT = z.infer<typeof Lesson>;
