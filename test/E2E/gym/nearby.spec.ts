import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { describe } from 'node:test'
import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Fetch Nearby Gyms Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Joe's Gym",
        description: 'This the best gym of the neighborhood',
        phone: null,
        latitude: -21.489069,
        longitude: -41.615661,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Strong Gym',
        description: 'This the best gym of the neighborhood',
        phone: null,
        latitude: -21.737404,
        longitude: -41.332659,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -21.489069,
        longitude: -41.615661,
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "Joe's Gym" }),
    ])
  })
})
