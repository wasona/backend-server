import fs from "fs";

// Syntactic sugar for .sql file imports.
export default function readQuery(filepath: string) {
  return fs.readFileSync(filepath.replace("@", "src/"), "utf8");
}
