import { Request, Response } from "express";
import { apiSuccess, apiErrorGeneric } from "@utils/api/respond";
import { ServerState } from "@models/app/server_state_model";

export default function healthcheckApp(
  req: Request,
  res: Response,
  serverState: ServerState,
) {
  try {
    const message = `${serverState.serverConfig.serverName} up and good to go!`;
    return apiSuccess(res, 400, message);
  } catch (error) {
    apiErrorGeneric(res, error as Error);
  }
}
