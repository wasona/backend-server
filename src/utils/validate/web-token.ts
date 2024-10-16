import { JWTPayload, jwtVerify } from "jose";

async function verifyJWT(
  token: string,
  secretKey: Uint8Array,
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as JWTPayload;
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return null;
  }
}
