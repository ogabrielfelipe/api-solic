import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'

export async function search(req: FastifyRequest, rep: FastifyReply) {
  const searchGymsQueryParams = z.object({
    q: z.string(),
    page: z.number({ coerce: true }).min(1).default(1),
  })

  const { q, page } = searchGymsQueryParams.parse(req.query)

  const searchGyms = makeSearchGymsService()

  const { gyms } = await searchGyms.execute({
    page,
    query: q,
  })

  return rep.status(200).send({
    gyms,
  })
}
