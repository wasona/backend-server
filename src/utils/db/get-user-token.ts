import { db } from "@app";
import { UserTokens, UserTokensT } from "@models/db/user-tokens";
import { readQuery } from "@utils/fs/read-query";
const getUserToken = readQuery("@queries/auth/get-user-token-by-id.sql");

export async function getUserTokenById(
  id: string, // TODO: uuid
): Promise<UserTokensT | undefined> {
  // #2 check if the email/id exists at all by querying DB
  let data = await db.any(getUserToken, id);
  if (data.length == 0) {
    return undefined;
  }
  data = data[0];

  // parse db row as ts type
  return UserTokens.parse(data);
}
