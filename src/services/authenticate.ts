import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user || !(await bcryptjs.compare(password, user.password_hash))) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
