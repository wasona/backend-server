export interface Course {
  source_language: string;
  target_language: string;
  lessons?: Lesson[];
}

export interface Lesson {
  title?: string;
  task: Task[];
}

export interface Task {
  type: "short input" | "listen"; // TODO more types
  give: string;
  accept: string[];
  reject: string[];
}
