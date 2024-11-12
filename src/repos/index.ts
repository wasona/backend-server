import { CoursesRepository } from "./course";
import { LessonsRepository } from "./lesson";
import { TasksRepository } from "./task";
import { UsersRepository } from "./user";
import { UserLogsRepository } from "./user-log";
import { UserTokensRepository } from "./user-token";

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
  userLogs: UserLogsRepository;
  userTokens: UserTokensRepository;
  courses: CoursesRepository;
  lessons: LessonsRepository;
  tasks: TasksRepository;
}

export {
  CoursesRepository,
  IExtensions,
  LessonsRepository,
  TasksRepository,
  UserLogsRepository,
  UsersRepository,
  UserTokensRepository,
};
