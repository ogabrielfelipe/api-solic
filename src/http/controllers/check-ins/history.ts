import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'

export async function history(req: FastifyRequest, rep: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.number({ coerce: true }).min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const fetchUserCheckIns = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckIns.execute({
    userId: req.user.sub,
    page,
  })

  return rep.status(200).send({
    checkIns,
  })
}
