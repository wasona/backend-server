import { db } from "@app";
import { fetchCountriesList } from "@init/init-from-db/countries";
import { fetchLanguagesList } from "@init/init-from-db/languages";
import { ServerConfig, ServerState } from "@models/internal/server-state";
import { createTransport } from "nodemailer";

export async function createServerState(
  config: ServerConfig,
): Promise<ServerState> {
  // Validate the isoList against the Zod schema
  const languagesList = await fetchLanguagesList(db);
  const countriesList = await fetchCountriesList(db);

  const transporter = createTransport({
    host: config.smtpEndpoint,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.smtpServerUsername,
      pass: config.smtpServerPassword,
    },
  });

  return {
    serverConfig: config,
    languagesList: languagesList,
    countriesList: countriesList,
    transporter: transporter,
  } as ServerState;
}
