/* eslint-disable no-useless-catch */
import { prisma } from '../../../prisma/clientPrisma.js'

export async function createRole (input, prisma) {
  if (input.role.length < 3) {
    throw new Error('Valide el nombre del rol')
  }
  if (await existsRole(input.role)) {
    throw new Error('El role ya existe')
  }
  const { role } = input
  const newRole = await prisma.role.create({
    data: {
      role
    }
  })
  return newRole
}

export async function createState (input, prisma) {
  if (input.state.length < 3) {
    throw new Error('Valide la informacion')
  }
  if (await existsState(input.state)) {
    throw new Error('El estado ya existe')
  }
  const { state } = input
  const newState = await prisma.state.create({
    data: {
      state
    }
  })
  return newState
}

const existsRole = async (role) => {
  try {
    const Role = await prisma.role.findFirst({
      where: { role: { equals: role } }
    })

    if (Role) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}

const existsState = async (state) => {
  try {
    const Sate = await prisma.state.findFirst({
      where: { state: { equals: state } }
    })

    if (Sate) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}
