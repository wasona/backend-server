import cron from 'node-cron';
import { purgeUsers } from './purge-users'
import { ServerState } from '@models/internal/server-state';

export async function initNodeCron() {
    cron.schedule('0 * * * *', purgeUsers); // purges users that haven't validated themselves within the 24 hour window
}