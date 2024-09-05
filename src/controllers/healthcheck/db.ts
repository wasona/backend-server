import { Router, Request, Response } from "express";
import { db } from "../../app";

export function getDatabaseVersion(req: Request, res: Response) {
  db.any("SELECT VERSION();", [true])
    .then(function (data: any) {
      return res.json(data);
    })
    .catch(function (error: any) {
      console.log("ERROR:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
}
