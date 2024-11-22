import { ApiResponse } from "@models/internal/response";
import { ApiResponseCode } from "@models/internal/response-code";
import { Response } from "express";

// Helper functions to make api responses easier to read.

function codeName(code: ApiResponseCode) {
  return ApiResponseCode[code];
}

export async function apiSuccess(
  res: Response,
  status: number,
  data?: unknown,
) {
  const response: ApiResponse = {
    success: true,
    data: data,
    code: ApiResponseCode.Success,
    codeName: codeName(ApiResponseCode.Success),
  };
  res.status(status).json(response);
}

export async function apiError(
  res: Response,
  status: number,
  code: ApiResponseCode,
  error?: Record<string, unknown>,
) {
  const response: ApiResponse = {
    success: false,
    error: error,
    code: code,
    codeName: codeName(code),
  };
  res.status(status).json(response);
}
