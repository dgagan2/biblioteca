import jsonwebtoken from 'jsonwebtoken'

export async function verifyToken (token, secret) {
  return jsonwebtoken.verify(token, secret)
}
