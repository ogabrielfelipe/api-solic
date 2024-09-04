import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { describe } from 'node:test'
import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gymCreated = await prisma.gym.create({
      data: {
        title: "Joe's Gym",
        description: null,
        phone: null,
        latitude: -21.488999,
        longitude: -41.613639,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gymCreated.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -21.488999,
        longitude: -41.613639,
      })

    expect(response.statusCode).toEqual(201)
  })
})
