import { CoursesT } from "@models/tables/courses";
import { IDatabase, IMain } from "pg-promise";

const GET = `
  SELECT *
  FROM v1.courses
  WHERE course_id = ($1);
`;

const ADD = `
  INSERT INTO v1.courses (
    source_language,
    target_language,
  )
  VALUES ($1, $2)
  RETURNING *;
`;

export class CoursesRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async get(id: string): Promise<CoursesT | null> {
    return await this.db.oneOrNone(GET, id);
  }

  async add(sourceLanguage: string, targetLanguage: string): Promise<CoursesT> {
    return await this.db.one(ADD, [sourceLanguage, targetLanguage]);
  }
}
