import jsonwebtoken from 'jsonwebtoken'
const jwtConfig = {
  expiresIn: '1d'
}
export function signToken (payload, secret) {
  return jsonwebtoken.sign(payload, secret, jwtConfig)
}
