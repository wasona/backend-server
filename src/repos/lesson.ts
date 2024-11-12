import { LessonsT } from "@models/tables/lessons";
import { IDatabase, IMain } from "pg-promise";

const GET = `
  SELECT *
  FROM v1.lessons
  WHERE lesson_id = ($1);
`;

export class LessonsRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async get(id: string): Promise<LessonsT | null> {
    return await this.db.oneOrNone(GET, id);
  }
}
