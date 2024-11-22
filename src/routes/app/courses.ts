import { db } from "@app";
import { ServerState } from "@models/internal/server-state";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getCourses(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  // TODO: any additional data?
  // e.g. say how many lessons are currently completed by the user?
  let courses = await db.courses.readAll();
  return apiSuccess(res, 200, courses);
}
