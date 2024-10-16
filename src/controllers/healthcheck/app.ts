import { NextFunction, Request, Response } from "express";
import { apiSuccess, apiErrorGeneric } from "@utils/api/respond";
import { ServerState } from "@models/app/server_state_model";

export default async function healthcheckApp(
  req: Request,
  res: Response,
  next: NextFunction,
  serverState: ServerState,
) {
  try {
    const message = `${serverState.serverConfig.serverName} up and good to go!`;
    return apiSuccess(res, 400, message);
  } catch (error) {
    next(error);
  }
}
