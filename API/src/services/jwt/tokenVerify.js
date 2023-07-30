import jsonwebtoken from 'jsonwebtoken'

export function verifyToken (token, secret) {
  return jsonwebtoken.verify(token, secret)
}
