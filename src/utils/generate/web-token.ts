import { SignJWT } from "jose";
import { Temporal } from "temporal-polyfill";
import { v4 as uuid } from "uuid";

const secretKey = new TextEncoder().encode("your-256-bit-secret");

export async function createJWT(userId: string): Promise<string> {
  // Expire in an hour
  const soon = Temporal.Now.instant().add({ hours: 1 }).epochSeconds;

  return await new SignJWT({
    // Custom fields go here
    eat: true,
    jwt: uuid(),
  })
    .setProtectedHeader({ alg: "HS256" }) // algorithm can vary
    // iss
    .setIssuer("wasona")
    // sub
    .setSubject(userId)
    // aud
    .setAudience("api.wasona.com")
    // exp
    .setExpirationTime(soon)
    // iat
    .setIssuedAt()

    .sign(secretKey);
}
