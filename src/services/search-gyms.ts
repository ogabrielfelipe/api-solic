import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsRequest {
  query: string
  page: number
}

interface SearchGymsResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
