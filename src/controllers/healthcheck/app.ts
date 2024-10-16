import { NextFunction, Request, Response } from "express";
import { apiSuccess } from "@utils/api/respond";
import { ServerState } from "@models/app/server-state";

export async function healthcheckApp(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  const message = `${serverState.serverConfig.serverName} up and good to go!`;
  return apiSuccess(res, 400, { message: message });
}
