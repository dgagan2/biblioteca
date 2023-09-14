import { prisma } from '../../prisma/clientPrisma.js'
import { AuthenticationError } from 'apollo-server'
import bcrypt from 'bcrypt'
import { signToken } from './jwt/tokenSignin.js'
import { configDotenv } from 'dotenv'
configDotenv({ path: '../../.env' })

export async function Login (email, password) {
  const secret = process.env.SECRET_KEY
  if (!email || !password) {
    throw new Error('Los campos estan vacios')
  }
  const user = await prisma.user.findFirst({
    where: { email }, include: { role: true, state: true, profile: true }
  })
  if (!user) {
    throw new AuthenticationError('El usuario no existe')
  }
  if (user.state.state == 'disable') {
    throw new AuthenticationError('Usuario deshabilitado')
  }
  const validatehash = await bcrypt.compare(password, user.password)
  if (!validatehash) {
    throw new AuthenticationError('Contraseña incorrecta')
  } else {
    // Se envia a la tabla de auditoria de login el registro
    const audLogin = await prisma.aud_login.create({
      data: {
        user: user.email
      }
    })
    delete user.password // Se elimina la contraseña para no devolverla
    // la data que ira en el token
    const payload = {
      sub: user.id,
      role: user.role.role,
      state: user.state.state,
      idSession: audLogin.id
    }
    const token = signToken(payload, secret) // Se cifra el token
    return { user, token }
  }
}
