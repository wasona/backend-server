// function to convert a plaintext password to an argon2id hash with the following parameters:
// memory cost: 19*1024
// time cost: 2
// parallelism: 1 (can't afford to assume non-saturation of server resources)
// input: plaintext password string, output: hash string

import argon2 from "argon2";

export default async function hashPassword(password: string): Promise<string> {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw new Error("Failed to hash password");
  }
}
