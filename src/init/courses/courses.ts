import { Course, Lesson } from "@models/internal/course";
import { glob } from "glob";
import fs from "node:fs";
import toml from "toml";

export async function fetchCoursesList(db: any): Promise<Course[]> {
  // TODO: support loading arbitrary courses
  let courseDir = "courses/course-eng-tok/";
  let courseMetadata = fs.readFileSync(`${courseDir}/course.toml`, "utf8");
  let course = toml.parse(courseMetadata);
  return [{ ...course, lessons: await fetchLessons(courseDir) }];
}

async function fetchLessons(courseDir: string): Promise<Lesson[]> {
  let lessons = [];
  let lessonPaths = (
    await glob("courses/course-eng-tok/lessons/*.toml")
  ).sort();
  for (let lessonPath of lessonPaths) {
    let lesson: Lesson = toml.parse(fs.readFileSync(lessonPath, "utf8"));
    lessons.push(lesson);
  }
  return lessons;
}
