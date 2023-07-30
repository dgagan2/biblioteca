import { Strategy, ExtractJwt } from 'passport-jwt'
import { configDotenv } from 'dotenv'
import { prisma } from '../../../prisma/clientPrisma.js'
configDotenv({ path: '../../../.env' })
const secret = process.env.SECRET_KEY
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}
console.log('hola')
const jwtStrategy = new Strategy(options, async (payload, done) => {
  console.log('hola 2')
  try {
    // Verificar si el usuario existe en la base de datos usando Prisma
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    console.log(user)
    if (!user) {
      return done(null, false) // El usuario no existe
    }

    // Si el usuario existe se pasa como usuario autenticado
    done(null, user)
  } catch (error) {
    done(error, false)
  }
})

export default jwtStrategy
