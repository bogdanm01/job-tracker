import { pinoLogger } from 'hono-pino';
import { pino } from 'pino';
import pretty from 'pino-pretty';
import env from '@/env.js';
export function getPinoLogger() {
    return pinoLogger({
        pino: pino({
            level: env.LOG_LEVEL || 'info',
        }, env.NODE_ENV === 'production' ? undefined : pretty()),
        http: {
            reqId: () => crypto.randomUUID(),
            // referRequestIdKey: 'lol',
        },
    });
}
