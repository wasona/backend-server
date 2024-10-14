import { Request, Response, NextFunction } from "express";

export function time(req: Request, res: Response, next: NextFunction) {
  const startTime = process.hrtime(); // Start timing

  next();

  const endTime = process.hrtime(startTime); // End timing
  const durationMs = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
  console.log(`${req.route.path} took ${durationMs.toFixed(3)} ms`);
}
