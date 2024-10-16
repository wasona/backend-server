import { phone } from "phone";

export function normalizePhoneNumber(phoneNumber: string): string {
  // Only use after verification.
  return phone(phoneNumber).phoneNumber!;
}
