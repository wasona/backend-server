import { z } from "zod";

export const Tasks = z
  .object({
    task_id: z.string().uuid(),
    task_lesson: z.string().uuid(),
    task_type: z.number().int().min(0), // TODO: enum
    task_give: z.string(),
    task_accept: z.array(z.string()),
    task_reject: z.array(z.string()),
    task_index: z.number().int().min(0),
  })
  .strict();

export type TasksT = z.infer<typeof Tasks>;
