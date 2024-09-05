import { Router, Request, Response } from "express";
import { db } from "../app";

const router = Router();

router.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.get("/db", (req: Request, res: Response) => {
  db.any("SELECT VERSION();", [true])
    .then(function (data: any) {
      res.send(data);
    })
    .catch(function (error: any) {
      console.log("ERROR:", error);
    });
});

export default router;
