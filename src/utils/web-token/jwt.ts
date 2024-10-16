import { JWTPayload, SignJWT } from "jose";
import { v4 as uuidv4 } from "uuid";

const secretKey = new TextEncoder().encode("your-256-bit-secret");

async function createJWT(userId: string): Promise<string> {
  const payload: JWTPayload = {
    iss: "wasona",
    sub: userId,
    aud: "api.wasona.com",
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    iat: Math.floor(Date.now() / 1000),
    eat: true, // or false based on your logic
    jwt: uuidv4(), // generate a unique identifier
  };

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // algorithm can vary
    .sign(secretKey);

  return jwt;
}
