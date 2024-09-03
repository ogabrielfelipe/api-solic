import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CreateGymService } from '../create-gym'

export function makeCreateGymService() {
  const repositoryGym = new PrismaGymsRepository()
  const service = new CreateGymService(repositoryGym)

  return service
}
