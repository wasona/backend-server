import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { ServerState } from "@models/internal/server-state";
import { TasksRequestSchema } from "@models/request/app/task";
import { apiError, apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Validate the query
  const query = TasksRequestSchema.parse(req.query);

  if (!(await db.lessons.read(query.lessonId))) {
    return apiError(res, 400, ApiResponseCode.LessonNotFound);
  }

  let tasks = await db.tasks.readByLesson(query.lessonId);
  let taskIds = tasks?.map((task) => task.task_id);
  return apiSuccess(res, 200, taskIds);
}
