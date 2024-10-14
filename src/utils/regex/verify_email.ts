// function to verify whether an email is correctly formed using the RFC 5322 definitions
// feel free to use a library or the node.js regex functions
// input: email string | output: boolean

import { validate } from "deep-email-validator";

export default async function verifyEmail(
  email: string,
): Promise<[boolean, string?]> {
  let res = await validate(email);
  return [res.valid, res.reason];
}
