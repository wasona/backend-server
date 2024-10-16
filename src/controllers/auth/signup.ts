import { NextFunction, Request, Response } from "express";
import { db } from "@app";
import { z, ZodError } from "zod";
import { apiSuccess, apiError, apiErrorGeneric } from "@utils/api/respond";
import { readQuery } from "@utils/fs/read-query";
import { hashPassword } from "@utils/normalize/hash-password";
import { normalizePhoneNumber } from "@utils/normalize/phone-number";
import { validateEmail } from "@utils/validate/email";
import { validatePhoneNumber } from "@utils/validate/phone-number";
import { SignupRequestSchema } from "@models/app/auth/signup";
const signupQuery = readQuery("@queries/auth/signup.sql");

export async function signup(req: Request, res: Response, next: NextFunction) {
  // Validate the request body
  SignupRequestSchema.parse(req.body);

  // Validate email
  let [emailValid, emailRejectReason] = await validateEmail(req.body.userEmail);
  if (!emailValid) {
    return apiError(res, 400, "Email validation failed", {
      emailRejectionReason: emailRejectReason,
    });
  }

  // TODO: Validate username

  // Validate phone number
  if (!validatePhoneNumber(req.body.userPhone)) {
    return apiError(res, 400, "Phone validation failed");
  }

  // TODO: Validate country code
  // TODO: Validate subnational
  // TODO: Check if user already exists

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
  const data = await db.one(signupQuery, params);

  // Return without hashed password
  const { userPw, ...userWithoutPassword } = data;
  return apiSuccess(res, 200, "Signup successful", userWithoutPassword);
}
