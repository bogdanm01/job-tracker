import { OpenAPIHono } from '@hono/zod-openapi';
import { getPinoLogger } from './middleware/pino-logger.js';
const app = new OpenAPIHono();
app.use(getPinoLogger());
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.notFound((c) => {
    return c.json({ message: `Not found - ${c.req.path}` }, 404);
});
app.get('/error', (_c) => {
    throw new Error('neces moci');
});
// app.onError((error, c) => {
//   const env = process.env.NODE_ENV
//   return c.json({ message: `Internal server error: ${error.message}`, stack: env === 'production' ? undefined : error.stack }, 500)
// })
export default app;
