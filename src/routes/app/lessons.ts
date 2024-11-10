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

  if (!(body.course in serverState.courses)) {
    return apiError(res, 400, ApiResponseCode.CourseNotFound);
  }
  const lessons = serverState.courses[body.course].lessons;

  // TODO: require lessons to have a title
  // TODO: implement availability based on user progress
  const lessonsInfo = Object.entries(lessons).map(([name, lesson]) => ({
    title: lesson.title || "unknown",
    available: true,
  }));
  return apiSuccess(res, 200, { lessons: lessonsInfo });
}
