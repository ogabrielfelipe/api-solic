import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
  page: number
}

interface FetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      userLatitude,
      userLongitude,
    })

    return {
      gyms,
    }
  }
}
