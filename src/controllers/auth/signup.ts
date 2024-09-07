import { Router, Request, Response } from "express";
import { db } from "../../app";
// replace with SignupRequestSchema?
import fs from "fs";

export function signup(req: Request, res: Response) {
  console.log(req.body);
  // so this is the request body, a custom-form JSON
  // that we will validate against the class somehow
  console.log(req.query);
}
