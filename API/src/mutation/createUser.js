/* eslint-disable no-useless-catch */
import { v1 as uuid } from 'uuid'
import { validarEmail, validarPassword } from '../validations/validateCreateUser.js'
import { prisma } from '../../prisma/clientPrisma.js'
import bcrypt from 'bcrypt'
export async function createUser (input, prisma) {
  const { email, password, surname, residence, name, phoneNumber, age } = input
  if (!isValidEmail(email)) {
    throw new Error('Correo electrónico inválido.')
  }
  if (await existsEmail(email) === true) {
    throw new Error('El correo ya existe')
  }

  // Verificar que el campo de contraseña cumple con ciertos criterios de seguridad
  if (!isValidPassword(password)) {
    throw new Error('La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, minúsculas y caracteres especiales.')
  }
  const newPassword = await bcrypt.hash(password, 5)
  // Validar que los campos opcionales no exceden cierta longitud máxima
  if (name && name.length > 50) {
    throw new Error('El nombre debe tener menos de 50 caracteres.')
  }

  if (surname && surname.length > 50) {
    throw new Error('El apellido debe tener menos de 50 caracteres.')
  }
  if (Number.isInteger(parseInt(email)) || age < 0) {
    throw new Error('La edad debe ser un número entero positivo.')
  }

  const userId = uuid()

  const newUser = await prisma.user.create({
    data: {
      id: userId,
      email,
      password: newPassword,
      profile: {
        create: {
          name,
          surname,
          residence,
          phoneNumber,
          age
        }
      }
    },
    include: {
      profile: true
    }
  }
  )
  return newUser
}

const existsEmail = async (email) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: { equals: email } }
    })

    if (user) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}
// Validar el formato del correo
const isValidEmail = (email) => {
  const esValido = validarEmail(email)
  if (esValido) {
    return true
  } else {
    return false
  }
}

// Función para validar la contraseña
function isValidPassword (password) {
  const esValido = validarPassword(password)
  if (esValido) {
    return true
  } else {
    return false
  }
}
