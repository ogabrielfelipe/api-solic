import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIns-respository'

import { GetUserMetricsService } from '@/services/get-user-metrics'
import { expect, describe, it, beforeEach } from 'vitest'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsService

describe('Get User Metrics Services', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsService(checkInRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    const MAX_CREATE_CHECK_IN = 20

    for (let i = 1; i <= MAX_CREATE_CHECK_IN; i++) {
      await checkInRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
      })
    }

    const checkInsCount = await sut.execute({
      userId: 'user-id-1',
    })

    expect(checkInsCount).toEqual(
      expect.objectContaining({ checkInsCount: MAX_CREATE_CHECK_IN }),
    )
  })
})
