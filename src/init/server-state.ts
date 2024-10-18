import { ServerConfig, ServerState } from "@models/internal/server-state";
import { Language, LanguageT } from "@models/tables/languages";
import { createTransport } from "nodemailer";

export function createServerState(
  config: ServerConfig,
  isoList: LanguageT[],
): ServerState {
  // Validate the isoList against the Zod schema
  const validatedIsoList = isoList.map((item) => Language.parse(item));

  const transporter = createTransport({
    host: config.smtpEndpoint,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.smtpServerUsername,
      pass: config.smtpServerPassword,
    },
  });

  const serverState: ServerState = {
    serverConfig: config,
    iso639List: validatedIsoList,
    transporter: transporter,
  };
  return serverState;
}
