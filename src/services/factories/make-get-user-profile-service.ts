import { GetUserProfileService } from '../get-user-profile'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeGetUserProfileService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new GetUserProfileService(prismaUsersRepository)

  return service
}
