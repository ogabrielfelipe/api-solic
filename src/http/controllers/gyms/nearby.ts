import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearby(req: FastifyRequest, rep: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number({ coerce: true }).refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number({ coerce: true }).refine((value) => {
      return Math.abs(value) <= 180
    }),
    page: z.number({ coerce: true }).min(1).default(1),
  })

  const { latitude, longitude, page } = nearbyGymQuerySchema.parse(req.query)

  const fetchNearbyGyms = makeFetchNearbyGymsService()

  const { gyms } = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    page,
  })

  return rep.status(200).send({
    gyms,
  })
}
