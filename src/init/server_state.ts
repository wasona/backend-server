// let's load the ISO-639 table from DB. who knows, maybe there will be an expansion

import { ServerConfig, ServerState } from "../models/app/server_state_model";
import { Iso639 } from "../models/db/iso-639";

// hmm
export function createServerState(
  config: ServerConfig,
  isoList: Iso639[],
): ServerState {
  const serverState: ServerState = {
    serverConfig: config,
    iso639List: isoList,
  };
  return serverState;
}
