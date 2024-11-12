import { CoursesT } from "@models/tables/courses";
import { IDatabase, IMain } from "pg-promise";

const GET = `
  SELECT *
  FROM v1.courses
  WHERE course_id = ($1);
`;

export class CoursesRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async get(id: string): Promise<CoursesT | null> {
    return await this.db.oneOrNone(GET, id);
  }
}