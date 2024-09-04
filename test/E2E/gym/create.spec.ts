import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { describe } from 'node:test'
import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Create Gym Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Joe's Gym",
        description: null,
        phone: null,
        latitude: -21.488999,
        longitude: -41.613639,
      })

    expect(response.statusCode).toEqual(201)
  })
})
