import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number({ coerce: true }).refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number({ coerce: true }).refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)
  const { gymId } = createCheckInsParamsSchema.parse(req.params)

  const createCheckIn = makeCheckInService()

  await createCheckIn.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId: req.user.sub,
  })

  return rep.status(201).send()
}
