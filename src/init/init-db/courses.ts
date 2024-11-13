import { db } from "@app";
import { glob } from "glob";
import fs from "node:fs";
import toml from "toml";

export async function unloadCourses() {
  await db.courses.deleteAll();
}

export async function loadCourse(courseDir: string) {
  let courseToml = toml.parse(
    fs.readFileSync(`${courseDir}/course.toml`, "utf8"),
  );
  let course = await db.courses.create(
    courseToml.source_language,
    courseToml.target_language,
    courseToml.title,
  );

  // TODO: TOML validation
  let lessonPaths = (await glob(`${courseDir}/lessons/*.toml`)).sort();
  for (let [lessonIndex, lessonPath] of lessonPaths.entries()) {
    let lessonToml = toml.parse(fs.readFileSync(lessonPath, "utf8"));
    let lesson = await db.lessons.create(
      course.course_id,
      lessonIndex,
      lessonToml.title,
    );
    for (let [taskIndex, task] of lessonToml.tasks.entries()) {
      await db.tasks.create(
        lesson.lesson_id,
        0, // TODO: replace with enum
        task.give,
        task.accept,
        task.reject,
        taskIndex,
      );
    }
  }
}
