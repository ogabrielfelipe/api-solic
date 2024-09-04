import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number({ coerce: true }).refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number({ coerce: true }).refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    registerBodySchema.parse(req.body)

  const createGym = makeCreateGymService()

  await createGym.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return rep.status(201).send()
}
