import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { ServerState } from "@models/internal/server-state";
import { TaskAnswerRequestSchema } from "@models/request/app/task-answer";
import { apiError, apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function taskAnswer(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Validate the request body
  const body = TaskAnswerRequestSchema.parse(req.body);

  let task = await db.tasks.read(body.taskId);
  if (!task) {
    return apiError(res, 400, ApiResponseCode.TaskNotFound);
  }

  // TODO: handle mismatches in strings, e.g. punctuation, capitalisation
  let correct = task!.task_accept.includes(body.reply);

  return apiSuccess(res, 200, { correct: correct });
}
