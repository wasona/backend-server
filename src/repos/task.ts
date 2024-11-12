import { TasksT } from "@models/tables/tasks";
import { IDatabase, IMain } from "pg-promise";

const GET = `
  SELECT *
  FROM v1.tasks
  WHERE task_id = ($1);
`;

const ADD = `
  INSERT INTO v1.tasks (
    task_lesson,
    task_type,
    task_give,
    task_accept,
    task_reject,
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

export class TasksRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async get(id: string): Promise<TasksT | null> {
    return await this.db.oneOrNone(GET, id);
  }

  async add(
    taskLesson: string,
    taskType: number,
    taskGive: string,
    taskAccept: string[],
    taskReject: string[],
  ): Promise<TasksT> {
    return await this.db.one(ADD, [
      taskLesson,
      taskType,
      taskGive,
      taskAccept,
      taskReject,
    ]);
  }
}
