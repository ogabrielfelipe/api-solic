import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from '@/services/errors/user-already-exists-error'
import { RegisterService } from '@/services/registerService'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

describe('Register Services', () => {
  it('should hash user password upon registration', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(userRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password123',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(userRepository)

    const email = 'ohn.doe@example.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: 'password123',
    })

    await expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })

  it('should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(userRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
