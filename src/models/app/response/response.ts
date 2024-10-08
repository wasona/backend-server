// universal interface for all API responses
export interface ApiResponse {
  success: boolean;
  data?: Record<string, unknown>;
  message?: string;
  error?: Record<string, unknown>; // ? means this field is optional
}
