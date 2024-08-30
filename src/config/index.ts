import fs from 'fs'
import YAML from 'yaml'
import { z } from 'zod'

const pathConfig = fs.readFileSync('./requirements.yml', 'utf8')

const configSchema = z.object({
  non_functional_requirements: z.object({
    items_page: z.number().default(20),
    type_distance_gym: z.enum(['meters', 'kilometers']).default('meters'),
    distance_gym: z.number().default(100),
    type_nearby_distance_gym: z
      .enum(['meters', 'kilometers'])
      .default('meters'),
    nearby_distance_gym: z.number().default(10),
  }),
})

const config = configSchema.safeParse(YAML.parse(pathConfig))

if (config.success === false) {
  console.error('❎ Invalid requirements no-functional', config.error.format())
  throw new Error('Invalid requirements no-functional')
}

export const requirements_non_functional =
  config.data.non_functional_requirements // TODO(Gabriel): Alter the parameters in functions for requirements.yml
