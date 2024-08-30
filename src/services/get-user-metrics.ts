import { CheckInRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsInsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsInsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
