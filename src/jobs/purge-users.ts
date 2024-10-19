import { db } from "@app";
import { readQuery } from "@utils/fs/read-query";
import { logElapsedTimeError, logElapsedTimeSuccess } from "@utils/time/log-elapsed-time";

const purgeUsersQuery = readQuery("src/queries/auth/purge-users.sql");

export async function purgeUsers() {
    let startTime = process.hrtime();
    let affectedRows: number = 0;

    try {
        // purge users that haven't validated their emails within 24 hours
        affectedRows = await db.one<number>(purgeUsersQuery);
    } catch (e) {
        logElapsedTimeError(startTime, "purgeUsers", e);
    }

    logElapsedTimeSuccess(startTime, "purgeUsers", `${affectedRows} users purged`);
}