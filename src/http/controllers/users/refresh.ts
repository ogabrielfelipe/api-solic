import { FastifyReply, FastifyRequest } from 'fastify'
import { requirements_non_functional as rnf } from '@/config/index'

export async function refresh(req: FastifyRequest, rep: FastifyReply) {
  await req.jwtVerify({
    onlyCookie: true,
  })

  const { role } = req.user

  const token = await rep.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: rnf.expires_time_jwt,
      },
    },
  )

  const refreshToken = await rep.jwtSign(
    { role },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: rnf.expires_time_refresh_jwt,
      },
    },
  )

  return rep
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
