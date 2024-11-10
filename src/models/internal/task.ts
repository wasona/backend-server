import { z } from "zod";

export const Task = z
  .object({
    type: z.union([
      z.literal("short input"),
      z.literal("listen"),
      z.literal("chips"),
    ]),
    give: z.string(),
    accept: z.array(z.string()),
    reject: z.array(z.string()),
  })
  .strict();

export type TaskT = z.infer<typeof Task>;
