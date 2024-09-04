import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'

export async function validate(req: FastifyRequest, rep: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)

  const validateCheckIn = makeValidateCheckInService()

  await validateCheckIn.execute({ checkInId })

  return rep.status(204).send()
}
