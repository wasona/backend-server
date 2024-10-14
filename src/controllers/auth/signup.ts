import { Router, Request, Response } from "express";
import { db } from "@app";
import { z } from "zod";
import fs from "fs";
import { apiSuccess, apiError, apiErrorGeneric } from "@utils/api/respond";
import { hashPassword } from "@utils/cryptographic/hash_password";
import { verifyEmail } from "@utils/regex/verify_email";

const query = fs.readFileSync("src/queries/auth/signup.sql", "utf8");

export async function signup(req: Request, res: Response) {
  try {
    const params = [
      req.body.userEmail,
      await hashPassword(req.body.userPw),
      req.body.userName,
      req.body.userPhone,
      req.body.userCountry,
      req.body.userSubnational,
    ];

    let [emailValid, emailRejectReason] = await verifyEmail(req.body.userEmail);
    if (!emailValid) {
      return apiError(res, 400, "Email validation failed", {
        emailRejectionReason: emailRejectReason,
      });
    }

    const data = await db.one(query, params);
    // discard password hash
    const { userPw, ...userWithoutPassword } = data;
    return apiSuccess(res, 200, "Signup successful", userWithoutPassword);
  } catch (error) {
    apiErrorGeneric(res, error as Error);
  }
}
