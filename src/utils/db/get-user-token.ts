import { db } from "@app";
import { UserTokensT } from "@models/tables/user-tokens";
import { readQuery } from "@utils/internal/read-query";

const getUserToken = readQuery("src/queries/auth/get-user-token-by-id.sql");

export async function getUserTokenById(
  id: string, // TODO: uuid
): Promise<UserTokensT | undefined> {
  // #2 check if the email/id exists at all by querying DB
  let data = await db.oneOrNone(getUserToken, id);

  // parse db row as ts type
  return data;
}
