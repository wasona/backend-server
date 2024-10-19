import { db } from "@app";
import { UserTokenTypes } from "@models/tables/user-token-types";
import { readQuery } from "@utils/internal/read-query";
import { UUID } from "crypto";

const persistUserToken = readQuery("src/queries/auth/persist-user-token.sql");

export async function setUserToken(
  // TODO: userId is a uuid but a zod-y uuid.
  // crypto UUID doesn't like that
  userId: string,
  userTokenType: UserTokenTypes,
  expiresInDays: number,
): Promise<UUID> {
  // Generate user_token and persist it to database
  const genTime = new Date();
  const expiryTime = new Date(genTime);
  expiryTime.setDate(expiryTime.getDate() + expiresInDays);

  const userTokenId: UUID = await db.one(persistUserToken, [
    userId,
    userTokenType,
    genTime.toISOString(),
    expiryTime.toISOString(),
  ]);
  return userTokenId;
}
