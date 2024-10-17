import { ServerConfig, ServerState } from "@models/app/server-state";
import { Language, LanguageT } from "@models/db/languages";

export function createServerState(
  config: ServerConfig,
  isoList: LanguageT[],
): ServerState {
  // Validate the isoList against the Zod schema
  const validatedIsoList = isoList.map((item) => Language.parse(item));

  const serverState: ServerState = {
    serverConfig: config,
    iso639List: validatedIsoList,
  };
  return serverState;
}