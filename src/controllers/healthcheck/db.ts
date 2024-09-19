import { Router, Request, Response } from "express";
import { db } from "@app";
import fs from "fs";

const query = fs.readFileSync(
  "src/queries/healthcheck/select_version.sql",
  "utf8",
);

export function getDatabaseVersion(req: Request, res: Response) {
  const startTime = process.hrtime(); // Start timing

  db.one(query) // you use 'one' when only one row is expected to be returned
    .then(function (data: any) {
      return res.json(data.version);
    })
    .catch(function (error: any) {
      console.log("ERROR:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    })
    .finally(() => {
      const endTime = process.hrtime(startTime); // End timing
      const durationMs = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
      console.log(`getDatabaseVersion took ${durationMs.toFixed(3)} ms`);
    });
}
