import { db } from "@app";
import { UserLogTypes } from "@models/tables/user-log-types";
import { readQuery } from "@utils/internal/read-query";
import { UUID } from "crypto";

const persistUserLog = readQuery("src/queries/auth/persist-user-log.sql");

export async function logUserAction(
  userId: string,
  userLogType: UserLogTypes,
): Promise<UUID> {
  const genTime = new Date();

  const userTokenId: UUID = await db.one(persistUserLog, [
    userId,
    userLogType,
    genTime.toISOString(),
  ]);
  return userTokenId;
}
