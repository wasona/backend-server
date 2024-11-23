import { IDatabase, IInitOptions } from "pg-promise";
import {
  CountriesRepository,
  CoursesRepository,
  IExtensions,
  LanguagesRepository,
  LessonsRepository,
  TasksRepository,
  UserLogsRepository,
  UsersRepository,
  UserTokensRepository,
} from "../repos";

export const initOptions: IInitOptions<IExtensions> = {
  extend(obj: IDatabase<IExtensions> & IExtensions, dc: any) {
    obj.countries = new CountriesRepository(obj, obj.$config.pgp);
    obj.courses = new CoursesRepository(obj, obj.$config.pgp);
    obj.languages = new LanguagesRepository(obj, obj.$config.pgp);
    obj.lessons = new LessonsRepository(obj, obj.$config.pgp);
    obj.tasks = new TasksRepository(obj, obj.$config.pgp);
    obj.userLogs = new UserLogsRepository(obj, obj.$config.pgp);
    obj.users = new UsersRepository(obj, obj.$config.pgp);
    obj.userTokens = new UserTokensRepository(obj, obj.$config.pgp);
  },
};
