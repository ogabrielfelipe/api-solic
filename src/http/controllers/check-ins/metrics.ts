import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function metrics(req: FastifyRequest, rep: FastifyReply) {
  const getUserMetrics = makeGetUserMetricsService()

  const { checkInsCount } = await getUserMetrics.execute({
    userId: req.user.sub,
  })

  return rep.status(200).send({
    checkInsCount,
  })
}
