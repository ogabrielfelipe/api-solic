import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { describe } from 'node:test'
import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Check-in Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
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

    let checkIn = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: gymCreated.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
