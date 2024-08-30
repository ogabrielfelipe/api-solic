import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-respository'

import { SearchGymsService } from '@/services/search-gyms'
import { expect, describe, it, beforeEach } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gym Services', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to get gyms by title', async () => {
    await gymsRepository.create({
      title: "Joe's Gym",
      description: 'This the best gym of the neighborhood',
      phone: null,
      latitude: -21.48879,
      longitude: -41.617232,
    })

    await gymsRepository.create({
      title: 'Strong Gym',
      description: 'This the best gym of the neighborhood',
      phone: null,
      latitude: -21.490195,
      longitude: -41.619325,
    })

    const { gyms } = await sut.execute({
      query: 'Joe',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Joe's Gym" })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    const MAX_CREATE_CHECK_IN = 22

    for (let i = 1; i <= MAX_CREATE_CHECK_IN; i++) {
      await gymsRepository.create({
        title: `Joe's Gym ${i}`,
        description: 'This the best gym of the neighborhood',
        phone: null,
        latitude: -21.490195,
        longitude: -41.619325,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Joe',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: `Joe's Gym 21` }),
      expect.objectContaining({ title: `Joe's Gym 22` }),
    ])
  })
})
