import { db } from "@app";
import { ApiResponseCode } from "@models/app/api/response-code";
import { SignupRequestSchema } from "@models/app/auth/signup";
import { apiError, apiSuccess } from "@utils/api/respond";
import { readQuery } from "@utils/fs/read-query";
import { normalizeEmail } from "@utils/normalize/email";
import { hashPassword } from "@utils/normalize/hash-password";
import { normalizePhoneNumber } from "@utils/normalize/phone-number";
import { validatePhoneNumber } from "@utils/validate/phone-number";
import { NextFunction, Request, Response } from "express";
const signupQuery = readQuery("@queries/auth/signup.sql");

export async function signup(req: Request, res: Response, next: NextFunction) {
  // Validate the request body
  const body = SignupRequestSchema.parse(req.body);

  // TODO: Validate username

  // Validate phone number
  if (!validatePhoneNumber(req.body.userPhone)) {
    return apiError(res, 400, ApiResponseCode.PhoneValidationFailed);
  }

  // TODO: Validate country code
  // TODO: Validate subnational
  // TODO: Check if user already exists

  // Normalise params
  const params = [
    normalizeEmail(body.userEmail),
    await hashPassword(body.userPw),
    body.userName,
    normalizePhoneNumber(body.userPhone),
    body.userCountry,
    body.userSubnational,
  ];

  // Insert into database
  const data = await db.one(signupQuery, params);

  // Return without hashed password
  const { user_pw, ...userWithoutPassword } = data;
  return apiSuccess(res, 200, userWithoutPassword);
}
