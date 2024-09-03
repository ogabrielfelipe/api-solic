import { GetUserMetricsService } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsService() {
  const prismaUsersRepository = new PrismaCheckInsRepository()
  const service = new GetUserMetricsService(prismaUsersRepository)

  return service
}
