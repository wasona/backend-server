import { Router, Request, Response } from "express";
import { db } from "../../app";

export function getAllIso639(req: Request, res: Response) {
  // db.any executes a query that expects any number of rows to be returned
  db.any("SELECT * FROM v1.iso_639;")
    .then(function (
      // The 'data' parameter is an array of objects returned from the database query
      data: {
        iso_639_2: string; // ISO 639-2 code
        iso_639_english_name: string; // English name of the language
        iso_639_korean_name: string; // Korean name of the language
        iso_639_1: string; // ISO 639-1 code
      }[], //array indicator?
    ) {
      // Mapping the query results to Iso639 instances
      const iso639List = data.map(
        (item) =>
          new Iso639(
            item.iso_639_2,
            item.iso_639_english_name,
            item.iso_639_korean_name,
            item.iso_639_1,
          ),
      );
      // Returning the JSON response with the list of Iso639 instances
      return res.json(iso639List);
    })
    .catch(function (error: Error) {
      // Catching and logging any error that occurs during the query execution
      console.log("ERROR:", error);
      // Returning a 500 Internal Server Error response in case of an error
      return res.status(500).json({ error: "Internal Server Error" });
    });
}
