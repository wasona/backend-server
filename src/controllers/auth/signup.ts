import { Router, Request, Response } from "express";
import { db } from "@app";
import { z } from "zod";
import fs from "fs";
import { ApiResponse } from "@models/app/response/response";

const query = fs.readFileSync("src/queries/auth/signup.sql", "utf8");

export async function signup(req: Request, res: Response) {
  try {
    const params = [
      req.body.userEmail,
      req.body.userPw,
      req.body.userName,
      req.body.userPhone,
      req.body.userCountry,
      req.body.userSubnational,
    ];

    const data = await db.one(query, params);
    // discard password hash
    const { userPw, ...userWithoutPassword } = data;
    const response: ApiResponse = {
      success: true,
      data: userWithoutPassword,
      message: "Signup successful!",
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("ERROR:", error);

    if (error instanceof z.ZodError) {
      const response: ApiResponse = {
        success: false,
        error: { validationErrors: error.errors },
        message: "Validation failed",
      };
      return res.status(400).json(response);
    } else {
      const response: ApiResponse = {
        success: false,
        error: { message: (error as Error).message },
        message: "Internal Server Error",
      };
      return res.status(500).json(response);
    }
  }
}
