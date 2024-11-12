import { CoursesT } from "@models/tables/courses";
import { IDatabase, IMain } from "pg-promise";

const READ = `
  SELECT *
  FROM v1.courses
  WHERE course_id = ($1);
`;

const READ_ALL = `
  SELECT *
  FROM v1.courses;
`;

const CREATE = `
  INSERT INTO v1.courses (
    course_source_language,
    course_target_language
  )
  VALUES ($1, $2)
  RETURNING *;
`;

const DELETE_ALL = `
  DELETE FROM v1.courses;
`;

export class CoursesRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async read(id: string): Promise<CoursesT | null> {
    return await this.db.oneOrNone(READ, id);
  }

  async readAll(): Promise<CoursesT[] | null> {
    return await this.db.any(READ_ALL);
  }

  async create(
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<CoursesT> {
    return await this.db.one(CREATE, [sourceLanguage, targetLanguage]);
  }

  // TODO
  async deleteAll() {
    return await this.db.none(DELETE_ALL);
  }
}
