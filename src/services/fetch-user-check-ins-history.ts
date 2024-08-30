import { CheckInRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsService {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsRequest): Promise<FetchUserCheckInsResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
