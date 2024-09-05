import { Router, Request, Response } from "express";
import { db } from "../../app";
import { Iso639 } from "../../models/db_models/iso-639";

export function getAllIso639(req: Request, res: Response) {
  // db.any executes a query that expects any number of rows to be returned
  db.any("SELECT * FROM v1.iso_639;")
    .then(function (data: any[]) {
      // Validate and map the data to Iso639 instances
      const iso639List = data.map(item => {
        try {
          return new Iso639(
            item.iso_639_2,
            item.iso_639_english_name,
            item.iso_639_korean_name,
            item.iso_639_1 || null
          );
        } catch (error) {
          console.log("Validation ERROR:", error);
          throw new Error("Validation Error");
        }
      });
      // Returning the JSON response with the list of Iso639 instances with a name
      return res.json({ iso639List });
    })
    .catch(function (error: Error) {
      // Catching and logging any error that occurs during the query execution
      console.log("ERROR:", error);
      // Returning a 500 Internal Server Error response in case of an error
      return res.status(500).json({ error: "Internal Server Error" });
    });
}
