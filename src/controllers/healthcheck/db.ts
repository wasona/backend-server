import { Router, Request, Response } from "express";
import { db } from "@app";
import fs from "fs";
import { apiErrorGeneric, apiSuccess } from "@utils/api/respond";

const query = fs.readFileSync(
  "src/queries/healthcheck/select_version.sql",
  "utf8",
);

export default function getDatabaseVersion(req: Request, res: Response) {
  db.one(query) // you use 'one' when only one row is expected to be returned
    .then(function (data: any) {
      return apiSuccess(res, 400, data.version);
    })
    .catch(function (error: any) {
      return apiErrorGeneric(res, error as Error);
    });
}
