import type { ZodTypeAny } from 'zod'
import { createRoute, type RouteConfig, z } from '@hono/zod-openapi'
import { StatusCodes } from 'http-status-codes'
import { createRouter } from '@/lib/create-app.js'

export function jsonResponse(schema: ZodTypeAny, description: string) {
  return {
    description,
    content: {
      'application/json': {
        schema,
      },
    },
  }
}

const doc1: RouteConfig = {
  tags: ['Index'],
  method: 'get',
  path: '/',
  responses: {
    [StatusCodes.OK]: jsonResponse(
      z.object({
        message: z.string().default('something'),
      }),
      'Something',
    ),
  },
}

const router = createRouter().openapi(
  createRoute(doc1),
  (c) => {
    return c.json({
      message: 'lol',
    }, StatusCodes.OK)
  },
)

export default router
