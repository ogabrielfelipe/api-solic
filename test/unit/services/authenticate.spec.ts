import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from '@/services/authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

import { expect, describe, it, beforeEach } from 'vitest'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Services', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('password123', 6),
    })

    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('password123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john.doe.testWrong@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('password123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john.doe@example.com',
        password: 'password12312',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
