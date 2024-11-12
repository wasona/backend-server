import { LessonsT } from "@models/tables/lessons";
import { IDatabase, IMain } from "pg-promise";

const GET = `
  SELECT *
  FROM v1.lessons
  WHERE lesson_id = ($1);
`;

const ADD = `
  INSERT INTO v1.lessons (
    lesson_course,
    lesson_index,
    lesson_title,
  )
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export class LessonsRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async get(id: string): Promise<LessonsT | null> {
    return await this.db.oneOrNone(GET, id);
  }

  async add(
    lessonCourse: string,
    lessonIndex: number,
    lessonTitle: string,
  ): Promise<LessonsT> {
    return await this.db.one(ADD, [lessonCourse, lessonIndex, lessonTitle]);
  }
}
