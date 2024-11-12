import { LessonsT } from "@models/tables/lessons";
import { IDatabase, IMain } from "pg-promise";

const READ = `
  SELECT *
  FROM v1.lessons
  WHERE lesson_id = ($1);
`;

const READ_ALL = `
  SELECT *
  FROM v1.lessons;
`;

const CREATE = `
  INSERT INTO v1.lessons (
    lesson_course,
    lesson_index,
    lesson_title
  )
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export class LessonsRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async read(id: string): Promise<LessonsT | null> {
    return await this.db.oneOrNone(READ, id);
  }

  async readAll(): Promise<LessonsT[] | null> {
    return await this.db.any(READ_ALL);
  }

  async create(
    lessonCourse: string,
    lessonIndex: number,
    lessonTitle: string,
  ): Promise<LessonsT> {
    return await this.db.one(CREATE, [lessonCourse, lessonIndex, lessonTitle]);
  }
}
