import type { PinoLogger } from 'hono-pino'
import type { Result } from 'hono/router'
import type { AppBindings } from './types.js'
import { type Hook, OpenAPIHono } from '@hono/zod-openapi'
import env from '@/env.js'
import { getPinoLogger } from '@/middleware/pino-logger.js'

function defaultHook(result: any, c: any) {
  if (!result.success) {
    return c.json({
      success: result.success,
      error: result.error,
    }, 500)
  }
}

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(getPinoLogger())

  app.notFound((c) => {
    return c.json({ message: `Not found - ${c.req.path}` }, 404)
  })

  app.onError((error, c) => {
    return c.json(
      {
        message: `Internal server error: ${error.message}`,
        stack: env.NODE_ENV === 'production' ? undefined : error.stack,
      },
      500,
    )
  })

  return app
}
