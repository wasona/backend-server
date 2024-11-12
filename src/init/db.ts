import { IDatabase, IInitOptions } from "pg-promise";
import {
  CoursesRepository,
  IExtensions,
  LessonsRepository,
  TasksRepository,
  UserLogsRepository,
  UsersRepository,
  UserTokensRepository,
} from "../repos";

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

export const initOptions: IInitOptions<IExtensions> = {
  extend(obj: ExtendedProtocol, dc: any) {
    obj.users = new UsersRepository(obj, obj.$config.pgp);
    obj.userTokens = new UserTokensRepository(obj, obj.$config.pgp);
    obj.userLogs = new UserLogsRepository(obj, obj.$config.pgp);
    obj.courses = new CoursesRepository(obj, obj.$config.pgp);
    obj.lessons = new LessonsRepository(obj, obj.$config.pgp);
    obj.tasks = new TasksRepository(obj, obj.$config.pgp);
  },
};
