// for non-middleware timing purposes
// use for successes ig
export function logElapsedTimeSuccess(startTime: [number, number], label: string, metadata: string) {
    const endTime = process.hrtime(startTime);
    const durationMs = endTime[0] * 1000 + endTime[1] / 1e6; // convert to milliseconds
    const logTimeISOString = new Date().toISOString();
    console.log(`${logTimeISOString} SUCCESS: ${label} took ${durationMs.toFixed(3)} ms`);
}

// for non-middleware timing purposes
// use for errors
export function logElapsedTimeError(startTime: [number, number], label: string, e: unknown) {
    const endTime = process.hrtime(startTime);
    const durationMs = endTime[0] * 1000 + endTime[1] / 1e6;
    const isoTimestamp = new Date().toISOString();

    let errorMessage = "Unknown error occurred";
    if (e instanceof Error) {
        errorMessage = e.message;
    } else if (typeof e === "string") {
        errorMessage = e;
    } else {
        try {
            errorMessage = JSON.stringify(e);
        } catch {
            errorMessage = "Error serializing the error object";
        }
    }

    console.error(`[${isoTimestamp}] ${label} failed: ${errorMessage}. Took ${durationMs.toFixed(3)} ms`);
}