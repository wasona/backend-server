import { phone } from "phone";

export default function normalizePhoneNumber(phoneNumber: string): string {
  // Only use after verification.
  return phone(phoneNumber).phoneNumber!;
}
