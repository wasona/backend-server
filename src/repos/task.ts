import { TasksT } from "@models/tables/tasks";
import { IDatabase, IMain } from "pg-promise";

const GET = `
  SELECT *
  FROM v1.tasks
  WHERE task_id = ($1);
`;

export class TasksRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async get(id: string): Promise<TasksT | null> {
    return await this.db.oneOrNone(GET, id);
  }
}
