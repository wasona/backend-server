import { db } from "@app";
import { Users, UsersT } from "@models/tables/users";
import { readQuery } from "@utils/fs/read-query";

const findEmail = readQuery("src/queries/auth/find-email.sql");

export async function getUserByEmail(
  email: string,
): Promise<UsersT | undefined> {
  // #2 check if the email/id exists at all by querying DB
  let data = await db.any(findEmail, email);
  if (data.length == 0) {
    return undefined;
  }
  // ideally, the db should only contain 1 user of any given email,
  // but i haven't done that yet
  data = data[0];

  // parse db row as ts type
  return Users.parse(data);
}
