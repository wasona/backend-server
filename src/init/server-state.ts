import { ServerConfig, ServerState } from "@models/internal/server-state";
import { createTransport } from "nodemailer";

export async function createServerState(
  config: ServerConfig,
): Promise<ServerState> {
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
    transporter: transporter,
  } as ServerState;
}
