import { UsersT } from "@models/tables/users";
import { IDatabase, IMain } from "pg-promise";

const READ_BY_EMAIL = `
  SELECT *
  FROM v1.users
  WHERE user_email = ($1);
`;

const CREATE = `
  INSERT INTO v1.users (
    user_email,
    user_pw,
    user_name,
    user_phone,
    user_country
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

const UPDATE_VERIFIED = `
  UPDATE v1.users
  SET user_verified = true
  WHERE user_id = ($1)
  RETURNING *;
`;

// deletes from users all accounts that haven't verified email within 24 hours
const DELETE_UNVERIFIED = `
  DELETE FROM v1.users
  WHERE
      user_verified = false
      AND user_created_at < (NOW() - INTERVAL '24 hours');
`;

export class UsersRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async readByEmail(email: string): Promise<UsersT | null> {
    return await this.db.oneOrNone(READ_BY_EMAIL, email);
  }

  async create(
    userEmail: string,
    userPw: string,
    userName: string,
    userPhone: string,
    userCountry: string,
  ): Promise<UsersT> {
    return await this.db.one(CREATE, [
      userEmail,
      userPw,
      userName,
      userPhone,
      userCountry,
    ]);
  }

  async updateVerified(id: string): Promise<UsersT> {
    return await this.db.one(UPDATE_VERIFIED, id);
  }

  // Returns how many users have been purged
  async deleteUnverified(): Promise<number> {
    return await this.db.one<number>(DELETE_UNVERIFIED);
  }
}
