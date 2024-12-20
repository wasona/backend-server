import { TasksT } from "@models/tables/tasks";
import { IDatabase, IMain } from "pg-promise";

const READ = `
  SELECT *
  FROM v1.tasks
  WHERE task_id = ($1);
`;

const READ_BY_LESSON = `
  SELECT *
  FROM v1.tasks
  WHERE task_lesson = ($1)
  ORDER BY task_index ASC;
`;

const READ_ALL = `
  SELECT *
  FROM v1.tasks;
`;

const CREATE = `
  INSERT INTO v1.tasks (
    task_lesson,
    task_type,
    task_give,
    task_accept,
    task_reject,
    task_index
  )
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

export class TasksRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async read(id: string): Promise<TasksT | null> {
    return await this.db.oneOrNone(READ, id);
  }

  async readByLesson(lessonId: string): Promise<TasksT[] | null> {
    return await this.db.manyOrNone(READ_BY_LESSON, lessonId);
  }

  async readAll(): Promise<TasksT[] | null> {
    return await this.db.any(READ_ALL);
  }

  async create(
    taskLesson: string,
    taskType: number,
    taskGive: string,
    taskAccept: string[],
    taskReject: string[],
    taskIndex: number,
  ): Promise<TasksT> {
    return await this.db.one(CREATE, [
      taskLesson,
      taskType,
      taskGive,
      taskAccept,
      taskReject,
      taskIndex,
    ]);
  }
}
