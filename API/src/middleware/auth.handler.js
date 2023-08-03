/* eslint-disable n/handle-callback-err */
import { Boom } from '@hapi/boom'
import { verifyToken } from '../services/jwt/tokenVerify.js'
import passport from 'passport'
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

export const authenticateMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json('No autorizado')
  }
  passport.authenticate('jwt', { session: false }, (err, payload) => {
    if (!payload) {
      return res.status(401).json('No está autorizado para acceder a este recurso')
    }
    if (payload.state == 'disable') {
      return res.status(401).json('No está autorizado para acceder a este recurso, usuario deshabilitado')
    }
    req.user = payload // Almacenar el usuario en req.user
    next()
  })(req, res, next)
}
