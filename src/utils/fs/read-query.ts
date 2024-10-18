import { readFileSync } from "fs";

// Syntactic sugar for .sql file imports.
export function readQuery(filepath: string): string {
  return readFileSync(filepath, "utf8");
}
