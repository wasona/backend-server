import { ServerState } from "@models/internal/server-state";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getCourses(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // TODO: say how many lessons are currently completed by the user?
  const coursesInfo = Object.entries(serverState.courses).map(
    ([name, course]) => ({
      name: name,
      lessons: course.lessons.length,
      sourceLanguage: course.source_language,
      targetLanguage: course.target_language,
    }),
  );
  return apiSuccess(res, 200, { courses: coursesInfo });
}
