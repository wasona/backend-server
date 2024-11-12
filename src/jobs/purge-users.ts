import { db } from "@app";
import {
  logElapsedTimeError,
  logElapsedTimeSuccess,
} from "@utils/time/log-elapsed-time";

export async function purgeUsers() {
  let startTime = process.hrtime();
  let affectedRows: number = 0;

  try {
    // purge users that haven't validated their emails within 24 hours
    affectedRows = await db.users.deleteUnverified();
  } catch (e) {
    logElapsedTimeError(startTime, "purgeUsers", e);
  }

  logElapsedTimeSuccess(
    startTime,
    "purgeUsers",
    `${affectedRows} users purged`,
  );
}
