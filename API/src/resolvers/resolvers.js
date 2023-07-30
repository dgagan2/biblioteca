/* eslint-disable no-useless-catch */
import { prisma } from '../../prisma/clientPrisma.js'
import { createUser } from '../mutation/createUser.js'
import { createRole, createState } from '../mutation/user/create.js'
import { createAuthor, createEditorial, createGender, createLanguage, createLocation } from '../mutation/book/create.js'
import { createBook } from '../mutation/book/createBooks.js'
import { Login } from '../services/login.js'

export const resolvers = {
  Query: {
    bookCount: async (_, __, { prisma }) => {
      const bookCount = await prisma.book.count()
      return bookCount
    },
    allbooks: async () => {
      return await prisma.book.findMany()
    },
    booksByName: async (_, { searchString }, { prisma }) => {
      return prisma.book.findMany({
        where: {
          name: {
            contains: searchString
          }
        }
      })
    },
    allEditorial: async () => {
      return await prisma.editorial.findMany()
    },
    editorialByName: async (_, { searchString }) => {
      return prisma.editorial.findMany({
        where: {
          name: {
            contains: searchString
          }
        }
      })
    },
    allAuthors: async () => { return await prisma.author.findMany() },
    authorByName: async (_, { searchedAuthor }) => {
      return prisma.author.findMany({
        where: {
          name: {
            contains: searchedAuthor
          }
        }
      })
    },
    allGender: async () => { return await prisma.gender.findMany() },
    genderByName: async (_, { searchedGender }) => {
      return prisma.gender.findMany({
        where: {
          gender: {
            contains: searchedGender
          }
        }
      })
    },
    allLocation: async () => { return await prisma.location.findMany() },
    locationByName: async (_, { searchedLocation }) => {
      return prisma.location.findMany({
        where: {
          shelfNumber: {
            contains: searchedLocation
          }
        }
      })
    },
    allUsers: async () => {
      try {
        const Users = await prisma.user.findMany({
          include: {
            profile: true,
            state: true,
            role: true
          }
        })
        return Users
      } catch (error) {
        throw new Error('Error de consulta')
      }
    },
    login: async (_, { email, password }) => {
      const { user, token } = await Login(email, password)
      return { user, token }
    }

  },
  Mutation: {
    createUser: async (_, { input }, { prisma }) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const newUser = await createUser(input, prisma)
        return newUser // Devolver el nuevo usuario si todo va bien
      } catch (error) {
        throw error // Manejar el error y devolver un mensaje de error adecuado
      }
    },
    createRole: async (_, { input }, { prisma }) => {
      try {
        const newRole = await createRole(input, prisma)
        return newRole
      } catch (error) {
        throw error
      }
    },
    createState: async (_, { input }, { prisma }) => {
      try {
        const newState = await createState(input, prisma)
        return newState
      } catch (error) {
        throw error
      }
    },
    createLanguage: async (_, { input }, { prisma }) => {
      try {
        const newLanguage = await createLanguage(input, prisma)
        return newLanguage
      } catch (error) {
        throw error
      }
    },
    createLocation: async (_, { input }, { prisma }) => {
      try {
        const newLanguage = await createLocation(input, prisma)
        return newLanguage
      } catch (error) {
        throw error
      }
    },
    createGender: async (_, { input }, { prisma }) => {
      try {
        const newGender = await createGender(input, prisma)
        return newGender
      } catch (error) {
        throw error
      }
    },
    createAuthor: async (_, { input }, { prisma }) => {
      try {
        const newAuthor = await createAuthor(input, prisma)
        return newAuthor
      } catch (error) {
        throw error
      }
    },
    createEditorial: async (_, { input }, { prisma }) => {
      try {
        const newEditorial = await createEditorial(input, prisma)
        return newEditorial
      } catch (error) {
        throw error
      }
    },
    createBook: async (_, { input }, { prisma }) => {
      try {
        const newBook = await createBook(input, prisma)
        return newBook
      } catch (error) {
        throw error
      }
    }

  }
}
