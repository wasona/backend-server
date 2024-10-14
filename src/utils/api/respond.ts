import { ApiResponse } from "@models/app/response/response";
import { Response } from "express";

// Helper functions to make api responses easier to read.

export async function apiSuccess(
  res: Response,
  status: number,
  message: string,
  data?: Record<string, unknown>,
) {
  const response: ApiResponse = {
    success: true,
    data: data,
    message: message,
  };
  return res.status(status).json(response);
}

export async function apiError(
  res: Response,
  status: number,
  message: string,
  error?: Record<string, unknown>,
) {
  const response: ApiResponse = {
    success: false,
    error: error,
    message: message,
  };
  return res.status(status).json(response);
}
