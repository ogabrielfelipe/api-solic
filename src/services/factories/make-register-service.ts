import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '../registerService'

export function makeRegisterService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(prismaUsersRepository)

  return registerService
}
