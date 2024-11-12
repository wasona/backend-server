import { UserTokenTypes } from "@models/tables/user-token-types";
import { UserTokensT } from "@models/tables/user-tokens";
import { IDatabase, IMain } from "pg-promise";

const READ = `
  SELECT *
  FROM v1.user_tokens
  WHERE user_token_id = ($1);
`;

const CREATE = `
  INSERT INTO v1.user_tokens (
    user_id,
    user_token_type,
    user_token_generated_on,
    user_token_expires_on
    )
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

const UPDATE_USED = `
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
  async read(id: string): Promise<UserTokensT | null> {
    return await this.db.oneOrNone(READ, id);
  }

  // TODO: userId is a uuid but a zod-y uuid.
  // crypto UUID doesn't like that
  async create(
    userId: string,
    userTokenType: UserTokenTypes,
    expiresInDays: number,
  ): Promise<UserTokensT> {
    // Generate user_token and persist it to database
    const genTime = new Date();
    const expiryTime = new Date(genTime);
    expiryTime.setDate(expiryTime.getDate() + expiresInDays);

    return await this.db.one(CREATE, [
      userId,
      userTokenType,
      genTime.toISOString(),
      expiryTime.toISOString(),
    ]);
  }

  async updateUsed(id: string): Promise<UserTokensT> {
    const usedOn = new Date().toISOString();
    return await this.db.one(UPDATE_USED, [id, usedOn]);
  }
}
