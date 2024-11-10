import { ServerState } from "@models/internal/server-state";
import { apiSuccess } from "@utils/internal/respond";
import { NextFunction, Request, Response } from "express";

export async function healthcheckApp(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  const message = `${serverState.serverConfig.serverName} up and good to go!`;
  return apiSuccess(res, 200, { message: message });
}
