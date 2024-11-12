import { db } from "@app";
import { ApiResponseCode } from "@models/internal/response-code";
import { ServerState } from "@models/internal/server-state";
import { LessonsRequestSchema } from "@models/request/app/lessons";
import { apiError, apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getLessons(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // Validate the request body
  const body = LessonsRequestSchema.parse(req.body);

  if (!(await db.courses.read(body.courseId))) {
    return apiError(res, 400, ApiResponseCode.CourseNotFound);
  }

  // TODO: implement availability based on user progress
  let lessons = await db.lessons.readByCourse(body.courseId);
  return apiSuccess(res, 200, { lessons: lessons });
}
