import { ServerConfig, ServerState } from "@models/app/server_state_model";
import { z } from "zod";
import { Iso_639, Iso_639T } from "@models/db/iso-639";

export function createServerState(
  config: ServerConfig,
  isoList: Iso_639T[],
): ServerState {
  // Validate the isoList against the Zod schema
  const validatedIsoList = isoList.map((item) => Iso_639.parse(item));

  const serverState: ServerState = {
    serverConfig: config,
    iso639List: validatedIsoList,
  };
  return serverState;
}
