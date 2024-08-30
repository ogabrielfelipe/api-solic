import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIns-respository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-respository'
import { CheckInService } from '@/services/check-in'
import { MaxDistanceError } from '@/services/errors/max-distance-error'
import { MaxNumberCheckInsError } from '@/services/errors/max-number-of-check-ins-error'
import { Decimal } from '@prisma/client/runtime/library'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Services', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInRepository, gymsRepository)

    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gym-id-1',
      title: "Joe's Gym",
      description: '',
      phone: '',
      latitude: -21.516224,
      longitude: -41.6186368,
      created_at: new Date(),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -21.516224,
      userLongitude: -41.6186368,
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -21.516224,
      userLongitude: -41.6186368,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-1',
        userId: 'user-id-1',
        userLatitude: -21.516224,
        userLongitude: -41.6186368,
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckInsError)
  })

  it('should be able to check in twice but different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -21.516224,
      userLongitude: -41.6186368,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: -21.516224,
      userLongitude: -41.6186368,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-id-2',
      title: "Joe's Gym",
      description: '',
      phone: '',
      latitude: new Decimal(-21.491825),
      longitude: new Decimal(-41.619607),
      created_at: new Date(),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-2',
        userId: 'user-id-1',
        userLatitude: -21.487449,
        userLongitude: -41.610163,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
