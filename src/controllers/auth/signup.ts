import { Request, Response, NextFunction } from "express";
import { db } from "@app";
import { z, ZodError } from "zod";
import fs from "fs";
import { apiSuccess, apiError, apiErrorGeneric } from "@utils/api/respond";
import hashPassword from "@utils/cryptographic/hash_password";
import verifyEmail from "@utils/regex/verify_email";
import {
  verifyPhoneNumber,
  normalizePhoneNumber,
} from "@utils/regex/verify_phone_number";
import { SignupRequestSchema } from "@models/app/auth/signup";

const query = fs.readFileSync("src/queries/auth/signup.sql", "utf8");

export default async function signup(req: Request, res: Response) {
  try {
    // Validate the request body
    SignupRequestSchema.parse(req.body);

    // Validate email
    let [emailValid, emailRejectReason] = await verifyEmail(req.body.userEmail);
    if (!emailValid) {
      return apiError(res, 400, "Email validation failed", {
        emailRejectionReason: emailRejectReason,
      });
    }

    // Validate phone number
    if (!verifyPhoneNumber(req.body.userPhone)) {
      return apiError(res, 400, "Phone validation failed");
    }

    // Normalise params
    const params = [
      req.body.userEmail,
      await hashPassword(req.body.userPw),
      req.body.userName,
      normalizePhoneNumber(req.body.userPhone),
      req.body.userCountry,
      req.body.userSubnational,
    ];

    // Insert into database
    const data = await db.one(query, params);

    // Return without hashed password
    const { userPw, ...userWithoutPassword } = data;
    return apiSuccess(res, 200, "Signup successful", userWithoutPassword);
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle SignupRequestSchema validation error
      return apiError(res, 400, "Schema validation error", {
        schema: error.errors,
      });
    } else {
      return apiErrorGeneric(res, error as Error);
    }
  }
}
