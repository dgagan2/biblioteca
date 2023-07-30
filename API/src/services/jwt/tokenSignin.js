import jsonwebtoken from 'jsonwebtoken'

export function signToken (payload, secret) {
  return jsonwebtoken.sign(payload, secret)
}
