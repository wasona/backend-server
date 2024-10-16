import { apiError } from "@utils/api/respond";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function handleErrors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    // Handle LoginRequestSchema validation error
    // Handle Users validation error
    return apiError(res, 400, "Schema validation error", {
      schema: error.errors,
    });
  } else {
    return apiError(res, 500, "Internal Server Error", {
      error: error.message,
    });
  }
}
