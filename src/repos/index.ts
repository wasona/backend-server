import { UsersRepository } from "./user";
import { UserLogsRepository } from "./user-log";
import { UserTokensRepository } from "./user-token";

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
  userLogs: UserLogsRepository;
  userTokens: UserTokensRepository;
}

export {
  IExtensions,
  UserLogsRepository,
  UsersRepository,
  UserTokensRepository,
};
