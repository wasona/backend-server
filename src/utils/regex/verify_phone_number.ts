// function to format a phone number into e164 format compliant phone number string
// feel free to use a library or the node.js regex functions
// input: plaintext phone number, iso-631 country code | output: e164 compliant phone number

import { phone } from "phone";

export function verifyPhoneNumber(phoneNumber: string): boolean {
  return phone(phoneNumber).isValid;
}

export function normalizePhoneNumber(phoneNumber: string): string {
  // Only use after verification.
  return phone(phoneNumber).phoneNumber!;
}
