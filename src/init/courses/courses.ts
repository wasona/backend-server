import { Course, CourseT } from "@models/internal/course";
import { Lesson, LessonT } from "@models/internal/lesson";
import { glob } from "glob";
import fs from "node:fs";
import toml from "toml";

export async function fetchCoursesList(): Promise<Record<string, CourseT>> {
  // TODO: support loading arbitrary courses
  let courseDir = "courses/course-eng-tok/";
  let course = Course.parse({
    ...toml.parse(fs.readFileSync(`${courseDir}/course.toml`, "utf8")),
    lessons: await fetchLessons(courseDir),
  });
  return { "eng-tok": course };
}

async function fetchLessons(courseDir: string): Promise<LessonT[]> {
  let lessons: LessonT[] = [];
  let lessonPaths = (
    await glob("courses/course-eng-tok/lessons/*.toml")
  ).sort();
  for (let lessonPath of lessonPaths) {
    lessons.push(Lesson.parse(toml.parse(fs.readFileSync(lessonPath, "utf8"))));
  }
  return lessons;
}
