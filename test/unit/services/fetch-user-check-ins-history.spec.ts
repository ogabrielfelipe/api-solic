import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIns-respository'

import { FetchUserCheckInsService } from '@/services/fetch-user-check-ins-history'
import { expect, describe, it, beforeEach } from 'vitest'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsService
const MAX_CREATE_CHECK_IN = 22

describe('Fetch User Check-in history Services', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsService(checkInRepository)
  })

  it('should be able to fetch check-in history ', async () => {
    await checkInRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    })

    await checkInRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id-1',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-1' }),
      expect.objectContaining({ gym_id: 'gym-id-2' }),
    ])
  })

  it('should be able to fetch paginated check-in history ', async () => {
    for (let i = 1; i <= MAX_CREATE_CHECK_IN; i++) {
      await checkInRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})
