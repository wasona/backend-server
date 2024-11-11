import { UserTokenTypes } from "@models/tables/user-token-types";
import { UserTokensT } from "@models/tables/user-tokens";
import { IDatabase, IMain } from "pg-promise";

const GET = `
  SELECT *
  FROM v1.user_tokens
  WHERE user_token_id = ($1);
`;

const ADD = `
  INSERT INTO v1.user_tokens (
    user_id,
    user_token_type,
    user_token_generated_on,
    user_token_expires_on
    )
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

const SET_USED = `
  UPDATE v1.user_tokens
  SET user_token_used_on = ($2)
  WHERE user_token_id = ($1)
  RETURNING *;
`;

export class UserTokensRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  // TODO: id -> uuid
  async get(id: string): Promise<UserTokensT | null> {
    return await this.db.oneOrNone(GET, id);
  }

  // TODO: userId is a uuid but a zod-y uuid.
  // crypto UUID doesn't like that
  async add(
    userId: string,
    userTokenType: UserTokenTypes,
    expiresInDays: number,
  ): Promise<UserTokensT> {
    // Generate user_token and persist it to database
    const genTime = new Date();
    const expiryTime = new Date(genTime);
    expiryTime.setDate(expiryTime.getDate() + expiresInDays);

    return await this.db.one(ADD, [
      userId,
      userTokenType,
      genTime.toISOString(),
      expiryTime.toISOString(),
    ]);
  }

  async setUsed(id: string): Promise<UserTokensT> {
    const usedOn = new Date().toISOString();
    return await this.db.one(SET_USED, [id, usedOn]);
  }
}
