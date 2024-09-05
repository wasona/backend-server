import { Router, Request, Response } from "express";
import { db } from "../../app";

export function getDatabaseVersion(req: Request, res: Response) {
  db.one("SELECT VERSION();") // you use 'one' when only one row is expected to be returned
    .then(function (data: any) {
      return res.json(data.version);
    })
    .catch(function (error: any) {
      console.log("ERROR:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
}
