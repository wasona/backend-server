import { ApiResponseCode } from "@models/app/api/response-code";
import { apiError } from "@utils/api/respond";
import { NextFunction, Request, Response } from "express";
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
    return apiError(res, 400, ApiResponseCode.SchemaValidationFailed, {
      schema: error.errors,
    });
  } else {
    return apiError(res, 500, ApiResponseCode.InternalServerError, {
      error: error.message,
    });
  }
}
