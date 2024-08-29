import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFound } from '@/services/errors/resource-not-found-error'

import { GetUserProfileService } from '@/services/get-user-profile'

import { hash } from 'bcryptjs'

import { expect, describe, it, beforeEach } from 'vitest'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Services', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(userRepository)
  })

  it('should be able to get profile', async () => {
    const userCreate = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('password123', 6),
    })

    const { user } = await sut.execute({
      userId: userCreate.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('password123', 6),
    })

    await expect(() =>
      sut.execute({
        userId: 'id-user-incorrect',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
