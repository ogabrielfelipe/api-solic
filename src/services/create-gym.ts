import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
