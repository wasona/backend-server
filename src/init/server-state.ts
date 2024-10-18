import { db } from "@app";
import { fetchIso639List } from "@init/init-from-db/iso-639";
import { ServerConfig, ServerState } from "@models/internal/server-state";
import { createTransport } from "nodemailer";

export async function createServerState(
  config: ServerConfig,
): Promise<ServerState> {
  // Validate the isoList against the Zod schema
  const validatedIsoList = await fetchIso639List(db);

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
