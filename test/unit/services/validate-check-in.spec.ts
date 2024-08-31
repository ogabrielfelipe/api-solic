import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIns-respository'
import { LateCheckInValidateError } from '@/services/errors/late-checkIn-validate-error'
import { ResourceNotFound } from '@/services/errors/resource-not-found-error'
import { ValidateCheckInService } from '@/services/validate-check-in'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService

describe('Validate Check-in Services', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInService(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check in', async () => {
    const createCheckIn = await checkInRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    })

    const { checkIn } = await sut.execute({
      checkInId: createCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'check-id-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 20, 0))

    const createCheckIn = await checkInRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
