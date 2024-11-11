import { UsersT } from "@models/tables/users";
import { IDatabase, IMain } from "pg-promise";

const GET_BY_EMAIL = `
  SELECT *
  FROM v1.users
  WHERE user_email = ($1);
`;

const ADD = `
  INSERT INTO v1.users (
    user_email,
    user_pw,
    user_name,
    user_phone,
    user_country,
    user_subnational
  )
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

const SET_VERIFIED = `
  UPDATE v1.users
  SET user_verified = true
  WHERE user_id = ($1)
  RETURNING *;
`;

export class UsersRepository {
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {}

  async getByEmail(email: string): Promise<UsersT | null> {
    return await this.db.oneOrNone(GET_BY_EMAIL, email);
  }

  async add(
    userEmail: string,
    userPw: string,
    userName: string,
    userPhone: string,
    userCountry: string,
    userSubnational: string,
  ): Promise<UsersT> {
    return await this.db.one(ADD, [
      userEmail,
      userPw,
      userName,
      userPhone,
      userCountry,
      userSubnational,
    ]);
  }

  async setVerified(id: string): Promise<UsersT> {
    return await this.db.one(SET_VERIFIED, id);
  }
}
