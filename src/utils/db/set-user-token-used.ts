import { db } from "@app";
import { readQuery } from "@utils/fs/read-query";

const setUserTokenUsedQuery = readQuery(
  "src/queries/auth/set-user-token-used.sql",
);

export async function setUserTokenUsed(
  id: string, // TODO: uuid
) {
  const usedOn = new Date().toISOString();
  await db.one(setUserTokenUsedQuery, [id, usedOn]);
}
