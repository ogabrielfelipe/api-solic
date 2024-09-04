import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { describe } from 'node:test'
import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-in History Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gymCreated = await prisma.gym.create({
      data: {
        title: "Joe's Gym",
        description: null,
        phone: null,
        latitude: -21.488999,
        longitude: -41.613639,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gymCreated.id,
          user_id: user.id,
        },
        {
          gym_id: gymCreated.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ user_id: user.id, gym_id: gymCreated.id }),
      expect.objectContaining({ user_id: user.id, gym_id: gymCreated.id }),
    ])
  })
})
