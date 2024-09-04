import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.jwtVerify()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return rep.status(401).send({ message: 'Unauthorized.' })
  }
}
