import { Boom } from '@hapi/boom'
import { verifyToken } from '../services/jwt/tokenVerify'

// chekea si en header de la peticion viene una key para usar la API
export function checkApi (req, res, next) {
  const apikey = req.headers.api
  if (apikey === '123') {
    next()
  } else {
    next(Boom.unauthorized())
  }
}
export function checkRoles (token, secret, ...roles) {
  return (req, res, next) => {
    const user = verifyToken(token, secret)
    if (roles.includes(user.role)) {
      next()
    } else {
      next(Boom.forbidden())
    }
  }
}
