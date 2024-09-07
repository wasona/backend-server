import { Router, Request, Response } from "express";
import { db } from "../../app";
import fs from "fs";

const query = fs.readFileSync("src/queries/auth/signup.sql", "utf8");

export function signup(req: Request, res: Response) {
  const params = [
    req.body.user_invitee_id,
    req.body.user_authority_id,
    req.body.user_email,
    req.body.user_pw,
    req.body.user_name,
    req.body.user_phone,
    req.body.user_country,
    req.body.user_subnational,
  ];
  db.none(query, params)
    .then(function (data: any) {
      return res.status(200);
    })
    .catch(function (error: any) {
      console.log("ERROR:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    })
    .finally(() => {});
}
