// from https://github.com/colinhacks/zod/blob/main/src/types.ts
// added named groups, hopefully doesn't break anything.
const emailRegex =
  /^(?!\.)(?!.*\.\.)(?<username>([A-Z0-9_'+\-\.]*)[A-Z0-9_+-])@(?<domain>([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,})$/i;
const findSuffix = /\+.*/;
const findPeriods = /\./g;

// Normalising emails is necessary to minimise abuse
// from people reregistering with identical mailboxes with different
// ascii strings. Unfortunately, there doesn't seem to be an industry
// standard for this.
export function normalizeEmail(email: string): string {
  // Assumes the email is valid.
  // Only use after zod schema validation.
  email = email.toLowerCase();
  let match = emailRegex.exec(email);
  let username = match!.groups!.username;
  let domain = match!.groups!.domain;

  if (domain == "gmail.com" || domain == "googlemail.com") {
    domain = "gmail.com";
    // Trigger provider-specific rules:
    username = username.replace(findSuffix, "").replace(findPeriods, "");
  } else if (
    domain == "pm.me" ||
    domain == "proton.me" ||
    domain == "protonmail.com"
  ) {
    domain = "protonmail.com";
  }
  // More providers? More rules?

  return `${username}@${domain}`;
}
