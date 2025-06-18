/* eslint-disable node/prefer-global/process */
import type { ZodError } from 'zod/v4'
import { config } from 'dotenv'
import { z } from 'zod'

config()

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
})

export type env = z.infer<typeof EnvSchema>

// eslint-disable-next-line ts/no-redeclare
let env: env

try {
  env = EnvSchema.parse(process.env)
}
catch (e) {
  const error = e as ZodError
  console.error('Invalid env')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default env
