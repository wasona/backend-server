import { Router, Request, Response } from "express";
import { db } from "@app";
import { z } from "zod";
import fs from "fs";
import { apiSuccess, apiError } from "@utils/api/respond";
import { hashPassword } from "@utils/cryptographic/hash_password";
import { verifyEmail } from "@utils/regex/verify_email";

const query = fs.readFileSync("src/queries/auth/signup.sql", "utf8");

export async function signup(req: Request, res: Response) {
  try {
    let [emailValid, emailRejectReason] = await verifyEmail(req.body.userEmail);
    if (!emailValid) {
      return apiError(res, 400, "Email validation failed", {
        reason: emailRejectReason,
      });
    }
    const params = [
      req.body.userEmail,
      await hashPassword(req.body.userPw),
      req.body.userName,
      req.body.userPhone,
      req.body.userCountry,
      req.body.userSubnational,
    ];

    const data = await db.one(query, params);
    // discard password hash
    const { userPw, ...userWithoutPassword } = data;
    return apiSuccess(res, 200, "Signup successful", userWithoutPassword);
  } catch (error) {
    console.log("ERROR:", error);
    if (error instanceof z.ZodError) {
      return apiError(res, 400, "Validation failed", {
        validationErrors: error.errors,
      });
    } else {
      return apiError(res, 500, "Internal Server Error", {
        message: (error as Error).message,
      });
    }
  }
}
