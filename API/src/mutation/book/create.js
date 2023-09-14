/* eslint-disable no-useless-catch */
import { prisma } from '../../../prisma/clientPrisma.js'

export async function createLanguage (input, prisma) {
  const { name } = input
  if (name.length < 3) {
    throw new Error('El nombre debe tener mas de 3 letras')
  }
  if (await existslanguage(input.name)) {
    throw new Error('El idioma ya existe')
  }
  const newLanguage = await prisma.language.create({
    data: {
      name
    }
  })
  return newLanguage
}

export async function createLocation (input, prisma) {
  if (input.shelfNumber.length < 2) {
    throw new Error('El campo debe tener minimo 2 letras')
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
    throw new Error('El genero debe tener mas de 3 letras')
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

export async function createAuthor (input, prisma) {
  const { name, surname, nacionality, profilePicture } = input
  if (name && surname.length < 3) {
    throw new Error('El nombre o apellido deben tener mas de 3 letras')
  }
  if (await existsAuthor(name, surname)) {
    throw new Error('El autor ya existe')
  }
  const newAuthor = await prisma.author.create({
    data: {
      name,
      surname,
      nacionality,
      profilePicture
    }
  })
  return newAuthor
}

export async function createEditorial (input, prisma) {
  const { name, phoneNumber, city } = input

  if (name.length < 3) {
    throw new Error('El nombre debe tener mas de 3 letras')
  }
  if (await existsEditorial(name)) {
    throw new Error('La editorial ya existe')
  }
  const newEditorial = await prisma.editorial.create({
    data: {
      name, phoneNumber, city
    }
  })
  return newEditorial
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
const existsAuthor = async (name, surname) => {
  try {
    const Author = await prisma.author.findFirst({
      where: { name, surname: { equals: name && surname } }
    })

    if (Author) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}
const existsEditorial = async (name) => {
  try {
    const Editorial = await prisma.editorial.findFirst({
      where: { name: { equals: name } }
    })
    if (Editorial) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    throw error
  }
}
