import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { FetchNearbyGymsService } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsService() {
  const repositoryGym = new PrismaGymsRepository()
  const service = new FetchNearbyGymsService(repositoryGym)

  return service
}
