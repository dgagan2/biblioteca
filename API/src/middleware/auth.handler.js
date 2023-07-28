import { Boom } from '@hapi/boom'

export function checkApi (req, esp, next) {
  const apikey = req.headers.api
  if (apikey === '123') {
    next()
  } else {
    next(Boom.unauthorized())
  }
}
