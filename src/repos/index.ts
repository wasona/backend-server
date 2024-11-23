import { CountriesRepository } from "./countries";
import { CoursesRepository } from "./course";
import { LanguagesRepository } from "./languages";
import { LessonsRepository } from "./lesson";
import { TasksRepository } from "./task";
import { UsersRepository } from "./user";
import { UserLogsRepository } from "./user-log";
import { UserTokensRepository } from "./user-token";

// Database Interface Extensions:
interface IExtensions {
  countries: CountriesRepository;
  courses: CoursesRepository;
  languages: LanguagesRepository;
  lessons: LessonsRepository;
  tasks: TasksRepository;
  userLogs: UserLogsRepository;
  users: UsersRepository;
  userTokens: UserTokensRepository;
}

export {
  CountriesRepository,
  CoursesRepository,
  IExtensions,
  LanguagesRepository,
  LessonsRepository,
  TasksRepository,
  UserLogsRepository,
  UsersRepository,
  UserTokensRepository,
};
