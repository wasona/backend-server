import { UserLogTypes } from "@models/tables/user-log-types";
import { UserLogsT } from "@models/tables/user-logs";
import { IDatabase, IMain } from "pg-promise";

const READ = `
  INSERT INTO v1.user_logs (
    user_id,
    user_log_type,
    user_log_generated_on
  )
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export class UserLogsRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async create(userId: string, userLogType: UserLogTypes): Promise<UserLogsT> {
    const genTime = new Date();

    const userLog = await this.db.one(READ, [
      userId,
      userLogType,
      genTime.toISOString(),
    ]);
    return userLog;
  }
}
