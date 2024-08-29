import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

import { ResourceNotFound } from './errors/resource-not-found-error'

interface getUserProfileRequest {
  userId: string
}

interface getUserProfileResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    userId,
  }: getUserProfileRequest): Promise<getUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound()
    }

    return {
      user,
    }
  }
}
