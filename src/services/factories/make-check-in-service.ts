import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CheckInService } from '../check-in'

export function makeCheckInService() {
  const repository = new PrismaCheckInsRepository()
  const repositoryGym = new PrismaGymsRepository()
  const service = new CheckInService(repository, repositoryGym)

  return service
}
