import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-respository'
import { FetchNearbyGymsService } from '@/services/fetch-nearby-gyms'

import { expect, describe, it, beforeEach } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Services', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: "Joe's Gym",
      description: 'This the best gym of the neighborhood',
      phone: null,
      latitude: -21.489069,
      longitude: -41.615661,
    })

    await gymsRepository.create({
      title: 'Strong Gym',
      description: 'This the best gym of the neighborhood',
      phone: null,
      latitude: -21.737404,
      longitude: -41.332659,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.487363,
      userLongitude: -41.610188,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Joe's Gym" })])
  })
})
