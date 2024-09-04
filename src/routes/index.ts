import { Router, Request, Response } from "express";

// app.ts
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
const dbPword = process.env.DB_PWORD; // Retrieve the environment variable

const pgp = require("pg-promise")();
const connection = {
  connectionString: `postgresql://admin:${dbPword}@localhost:5432/backend_db`,
  allowExitOnIdle: true,
};
const db = pgp(connection);

const router = Router();

// Define a simple route
router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Test db connection
router.get("/db", (req: Request, res: Response) => {
  db.any("SELECT VERSION();", [true])
    .then(function (data: any) {
      res.send(data);
    })
    .catch(function (error: any) {
      console.log("ERROR:", error);
    });
});

router.get("/db/iso-639", (req: Request, res: Response) => {
  db.any("SELECT * FROM v1.iso_639;", [true])
    .then(function (data: any) {
      res.send(data);
    })
    .catch(function (error: any) {
      console.log("ERROR:", error);
    });
});

// You can define more routes here
router.get("/about", (req: Request, res: Response) => {
  res.send("About us");
});

router.post("/data", (req: Request, res: Response) => {
  res.send(`You sent: ${JSON.stringify(req.body)}`);
});

export default router;
