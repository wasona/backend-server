import { Transporter } from "nodemailer";

export function sendMail(
  transporter: Transporter,
  payload: Record<string, unknown>,
) {
  // Send email with token id
  transporter
    .sendMail(payload)
    .then(() => {
      console.log(`Email to ${payload.to} sent successfully!`);
    })
    .catch((error) => {
      // It takes too long to send an email, so we would
      // rather let user try again, rather than keep them
      // waiting. Hence, error is only logged
      console.log("Sending mail failed!", error);
    });
}
