import { ApiResponseCode } from "@models/internal/response-code";

// universal interface for all API responses
export interface ApiResponse {
  success: boolean;
  data?: unknown;
  code: ApiResponseCode;
  codeName: string;
  error?: Record<string, unknown>; // ? means this field is optional
}
