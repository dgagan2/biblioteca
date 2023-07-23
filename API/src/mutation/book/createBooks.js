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
  if (bookCode.length > 0) {
    if (await validateCode(bookCode)) {
      throw new Error('El codigo del libro ya existe')
    }
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
