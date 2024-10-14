// function to verify a plaintext password against a preexisting hash
// input: plaintext password, hash string | output: boolean

import argon2 from "argon2";

export default async function validatePasswordHash(
  hash: string,
  password: string,
): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    throw new Error("Failed to verify password hash");
  }
}
