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

  if (!(body.course in serverState.courses)) {
    return apiError(res, 400, ApiResponseCode.CourseNotFound);
  }
  const lessons = serverState.courses[body.course].lessons;

  if (body.lessonId >= lessons.length) {
    return apiError(res, 400, ApiResponseCode.InvalidLessonId);
  }
  const tasks = lessons[body.lessonId].task;

  // TODO: figure out what data to show/hide.
  // TODO: Handle task types.
  return apiSuccess(res, 200, { tasks: tasks });
}
