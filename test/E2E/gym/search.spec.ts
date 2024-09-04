import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { describe } from 'node:test'
import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Search Gyms Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Joe's Gym",
        description: null,
        phone: null,
        latitude: -21.488999,
        longitude: -41.613639,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Bob's Gym",
        description: null,
        phone: null,
        latitude: -21.488999,
        longitude: -41.613639,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Joe',
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
