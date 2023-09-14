import { Strategy, ExtractJwt } from 'passport-jwt'
import { configDotenv } from 'dotenv'
import { prisma } from '../../../prisma/clientPrisma.js'
configDotenv({ path: '../../../.env' })
const secret = process.env.SECRET_KEY
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

const jwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload)
})

export default jwtStrategy
