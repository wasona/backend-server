import { Router, Request, Response } from "express";
import { db } from "@app";
import { apiErrorGeneric, apiSuccess } from "@utils/api/respond";
import readQuery from "@utils/fs/read_query";
const selectVersion = readQuery("@queries/healthcheck/select_version.sql");

export default function getDatabaseVersion(req: Request, res: Response) {
  // you use 'one' when only one row is expected to be returned
  db.one(selectVersion)
    .then(function (data: any) {
      return apiSuccess(res, 400, data.version);
    })
    .catch(function (error: any) {
      return apiErrorGeneric(res, error as Error);
    });
}
