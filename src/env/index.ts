import { config } from 'dotenv'
import { z } from 'zod'

let isTest = false

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test.local' })
  isTest = true
} else {
  config({ path: '.env.local' })
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.number({ coerce: true }).default(3333),
  CLIENT_DB: z.enum(['pg', 'sqlite']).default('pg'),
  DATABASE_URL: isTest === true ? z.string().nullable() : z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❎ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

console.log(_env.data)

export const env = _env.data
