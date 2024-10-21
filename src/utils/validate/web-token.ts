import { Request } from "express";
import { JWTPayload, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode("your-256-bit-secret");

export async function verifyJWT(req: Request): Promise<JWTPayload | null> {
  try {
    const token = req.cookies.login;
    const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
      issuer: "wasona", // issuer
      audience: "api.wasona.com", // audience
    });
    // console.log(payload);
    // console.log(protectedHeader);
    return payload as JWTPayload;
  } catch (error) {
    console.error("JWT Verification failed");
    return null;
  }
}
