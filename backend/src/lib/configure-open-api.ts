import type { AppOpenAPI } from './types.js'
import { Scalar } from '@scalar/hono-api-reference'

import packageJSON from '../../package.json' with { type: 'json' }

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Job Tracker API',
    },
  })

  app.get('/scalar', Scalar({ url: '/doc', theme: 'kepler', layout: 'classic', defaultHttpClient: {
    targetKey: 'js',
    clientKey: 'fetch',
  } }))
}
