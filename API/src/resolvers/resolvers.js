/* eslint-disable no-useless-catch */
import { prisma } from '../../prisma/clientPrisma.js'
import { createUser } from '../mutation/createUser.js'
import { createRole, createState } from '../mutation/user/create.js'
import { createAuthor, createEditorial, createGender, createLanguage, createLocation } from '../mutation/book/create.js'
import { createBook } from '../mutation/book/createBooks.js'
import { Login } from '../services/login.js'
import { createLending } from '../mutation/lending/createLending.js'
import { isAdmin } from '../middleware/auth.handler.js'

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
      if (!searchString) {
        throw new Error('El valor buscado no puede estar vacio')
      }
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
      if (!searchString) {
        throw new Error('El valor buscado no puede estar vacio')
      }
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
      if (!searchedAuthor) {
        throw new Error('El valor buscado no puede estar vacio')
      }
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
      if (!searchedGender) {
        throw new Error('El valor buscado no puede estar vacio')
      }
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
      if (!searchedLocation) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      return prisma.location.findMany({
        where: {
          shelfNumber: {
            contains: searchedLocation
          }
        }
      })
    },
    allUsers: async ({ user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const Users = await prisma.user.findMany({
          include: {
            profile: true,
            state: true,
            role: true
          }
        })
        delete Users.password
        return Users
      } catch (error) {
        throw new Error('Error de consulta')
      }
    },
    userByEmail: async (_, { searchedEmail }) => {
      if (!searchedEmail) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      return await prisma.user.findMany({
        where: {
          email: { contains: searchedEmail }
        },
        include: {
          state: true,
          role: true,
          profile: true
        }
      })
    },
    userById: async (_, { searchedId }) => {
      if (!searchedId) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      const user = await prisma.user.findFirst({
        where: {
          id: searchedId
        },
        include: {
          state: true,
          role: true,
          profile: true
        }
      })
      delete user.password
      return [user]
    },
    userByName: async (_, { searchedName }) => {
      if (!searchedName) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      return prisma.profile.findMany({
        where: {
          name: { contains: searchedName }
        },
        include: {
          user: true
        }
      })
    },
    login: async (_, { email, password }) => {
      const { user, token } = await Login(email, password)
      return { user, token }
    },
    lendingActiveByUser: async (_, { searchedUser }) => {
      if (!searchedUser) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      return prisma.lending.findMany({
        where: {
          userSession: { contains: searchedUser },
          state: { equals: 'prestado' }
        }
      })
    },
    AllLendingByUser: async (_, { searchedUser }) => {
      if (!searchedUser) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      return prisma.lending.findMany({
        where: {
          userSession: { contains: searchedUser }
        }
      })
    },
    lendingActiveByIdUser: async (_, { searchedUser }) => {
      if (!searchedUser) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      return prisma.lending.findMany({
        where: {
          idUser: { contains: searchedUser },
          state: { equals: 'prestado' }
        }
      })
    },
    AllLendingByIdUser: async (_, { searchedUser }) => {
      if (!searchedUser) {
        throw new Error('El valor buscado no puede estar vacio')
      }
      return prisma.lending.findMany({
        where: {
          idUser: { contains: searchedUser }
        }
      })
    },
    allLending: async () => { return await prisma.lending.findMany() },
    allRole: async () => { return await prisma.role.findMany() },
    allState: async () => { return await prisma.state.findMany() }
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
    createRole: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newRole = await createRole(input, prisma)
        return newRole
      } catch (error) {
        throw error
      }
    },
    createState: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newState = await createState(input, prisma)
        return newState
      } catch (error) {
        throw error
      }
    },
    createLanguage: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newLanguage = await createLanguage(input, prisma)
        return newLanguage
      } catch (error) {
        throw error
      }
    },
    createLocation: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newLanguage = await createLocation(input, prisma)
        return newLanguage
      } catch (error) {
        throw error
      }
    },
    createGender: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newGender = await createGender(input, prisma)
        return newGender
      } catch (error) {
        throw error
      }
    },
    createAuthor: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newAuthor = await createAuthor(input, prisma)
        return newAuthor
      } catch (error) {
        throw error
      }
    },
    createEditorial: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newEditorial = await createEditorial(input, prisma)
        return newEditorial
      } catch (error) {
        throw error
      }
    },
    createBook: async (_, { input }, { prisma, user }) => {
      if (!isAdmin(user.role)) {
        throw new Error('No esta autorizado, valide el role')
      }
      try {
        const newBook = await createBook(input, prisma)
        return newBook
      } catch (error) {
        throw error
      }
    },
    createLending: async (parent, { input }, { prisma, user }) => {
      try {
        const newLending = await createLending(input, prisma, user)
        return newLending
      } catch (error) {
        throw error
      }
    }

  }
}
