import { ServerState } from "@models/internal/server-state";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function getCourses(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  return apiSuccess(res, 400, { courses: serverState.courses });
}
