import { readFileSync } from "fs";

// Syntactic sugar for .sql file imports.
export function readQuery(filepath: string) {
  return readFileSync(filepath.replace("@", "src/"), "utf8");
}
