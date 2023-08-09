/* eslint-disable no-useless-catch */
import { prisma } from '../../../prisma/clientPrisma.js'

export async function createBook (input, prisma) {
  const {
    name, description, editorialId, authorId, genderId, nPages,
    editionYear, price, idLocation, nEdition, stock, languageId,
    bookCode, caratula
  } = input
  if (name < 3) {
    throw new Error('Valide el nombre')
  }
  if (!editorialId || !authorId || !genderId || !idLocation || !languageId) {
    throw new Error('Los campos marcado con * se deben diligenciar')
  }
  if (await validateName(name, editorialId)) {
    throw new Error('El libro ya existe')
  }
  if (!bookCode) {
    throw new Error('El codigo del libro es obligatorio')
  } else {
    if (await validateCode(bookCode)) {
      throw new Error('El codigo del libro ya existe')
    }
  }
  if (await validateIdLanguage(languageId) === false) {
    throw new Error('El id del lenguaje no existe')
  }
  if (await validateIdEditorial(editorialId) === false) {
    throw new Error('El id del editorial no existe')
  }
  if (await validateIdAuthor(authorId) === false) {
    throw new Error('El id del autor no existe')
  }
  if (await validateIdGender(genderId) === false) {
    throw new Error('El id del genero no existe')
  }
  if (await validateIdLocation(idLocation) === false) {
    throw new Error('El id de la ubicación no existe')
  }

  const newBook = await prisma.book.create({
    data: {
      name,
      description,
      editorialId: {
        connect: {
          id: editorialId
        }
      },
      authorId: {
        connect: {
          id: authorId
        }
      },
      genderId: {
        connect: {
          id: genderId
        }
      },
      nPages,
      editionYear,
      price,
      location: {
        connect: {
          id: idLocation
        }
      },
      nEdition,
      stock,
      languageId: {
        connect: {
          id: languageId
        }
      },
      bookCode,
      caratula
    },
    include: {
      editorialId: true,
      authorId: true,
      genderId: true,
      location: true,
      languageId: true
    }
  })
  return newBook
}
// Se valida que el nombre del libro no exista con una editorial en especifico
// En la relacion uno a muchos entre (1)libro y editorial(M)
// se debe validar si el libro existe por nombre y luego se valida si esta asociado a una editorial con some
const validateName = async (name, editorialId) => {
  try {
    const Name = await prisma.book.findFirst({
      where: {
        name,
        editorialId: {
          some: {
            id: editorialId
          }
        }
      }
    })
    if (Name) {
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

const validateCode = async (code) => {
  try {
    const Code = await prisma.book.findFirst({
      where: { bookCode: { equals: code } }
    })
    if (Code) {
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

const validateIdLanguage = async (id) => {
  try {
    const Language = await prisma.language.findFirst({
      where: { id }
    })
    if (Language) {
      return true
    } else { return false }
  } catch (error) {
    throw error
  }
}

const validateIdEditorial = async (id) => {
  try {
    const Editorial = await prisma.editorial.findFirst({
      where: { id }
    })
    if (Editorial) {
      return true
    } else { return false }
  } catch (error) {
    throw error
  }
}

const validateIdAuthor = async (id) => {
  try {
    const Author = await prisma.author.findFirst({
      where: { id }
    })
    if (Author) {
      return true
    } else { return false }
  } catch (error) {
    throw error
  }
}

const validateIdGender = async (id) => {
  try {
    const Gender = await prisma.gender.findFirst({
      where: { id }
    })
    if (Gender) {
      return true
    } else { return false }
  } catch (error) {
    throw error
  }
}

const validateIdLocation = async (id) => {
  try {
    const Location = await prisma.location.findFirst({
      where: { id }
    })
    if (Location) {
      return true
    } else { return false }
  } catch (error) {
    throw error
  }
}
