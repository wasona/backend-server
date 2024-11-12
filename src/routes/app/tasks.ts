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
  // Validate the request body
  const body = TasksRequestSchema.parse(req.body);

  if (!(await db.lessons.read(body.lessonId))) {
    return apiError(res, 400, ApiResponseCode.LessonNotFound);
  }

  let tasks = await db.tasks.readAll();
  // TODO: figure out what data to show/hide.
  // TODO: Handle task types.
  return apiSuccess(res, 200, { tasks: tasks });
}
