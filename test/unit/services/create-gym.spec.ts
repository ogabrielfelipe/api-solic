import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-respository'

import { CreateGymService } from '@/services/create-gym'

import { expect, describe, it, beforeEach } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Services', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: "Joe's Gym",
      description: null,
      phone: null,
      latitude: -21.488999,
      longitude: -41.613639,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
