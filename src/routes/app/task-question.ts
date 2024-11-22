import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { ServerState } from "@models/internal/server-state";
import { TaskQuestionRequestSchema } from "@models/request/app/task-question";
import { apiError, apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function taskQuestion(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Validate the query
  const query = TaskQuestionRequestSchema.parse(req.query);

  let task = await db.tasks.read(query.taskId);
  if (!task) {
    return apiError(res, 400, ApiResponseCode.TaskNotFound);
  }

  let response;
  // TODO: enum
  if (task.task_type == 0) {
    response = { type: task.task_type, give: task.task_give };
  } else {
    return apiError(res, 400, ApiResponseCode.NotImplemented);
  }
  return apiSuccess(res, 200, response);
}
