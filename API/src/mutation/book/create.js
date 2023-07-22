/* eslint-disable no-useless-catch */
import { prisma } from '../../../prisma/clientPrisma.js'

export async function createLanguage (input, prisma) {
  if (input.language.length < 3) {
    throw new Error('Valide la informacion')
  }
  if (await existslanguage(input.name)) {
    throw new Error('El idioma ya existe')
  }
  const { name } = input
  const newLanguage = await prisma.language.create({
    data: {
      name
    }
  })
  return newLanguage
}

export async function createLocation (input, prisma) {
  if (input.location.length < 3) {
    throw new Error('Valide la informacion')
  }
  if (await existsLocation(input.shelfNumber)) {
    throw new Error('La ubicación ya existe')
  }
  const { shelfNumber } = input
  const newLocation = await prisma.location.create({
    data: {
      shelfNumber
    }
  })
  return newLocation
}

export async function createGender (input, prisma) {
  if (input.gender.length < 3) {
    throw new Error('Valide la informacion')
  }
  if (await existsGender(input.gender)) {
    throw new Error('El genero ya existe')
  }
  const { gender } = input
  const newGender = await prisma.gender.create({
    data: {
      gender
    }
  })
  return newGender
}

const existslanguage = async (language) => {
  try {
    const Language = await prisma.language.findFirst({
      where: { name: { equals: language } }
    })

    if (Language) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}

const existsLocation = async (location) => {
  try {
    const Location = await prisma.location.findFirst({
      where: { shelfNumber: { equals: location } }
    })

    if (Location) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}

const existsGender = async (gender) => {
  try {
    const Gender = await prisma.gender.findFirst({
      where: { gender: { equals: gender } }
    })

    if (Gender) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}
