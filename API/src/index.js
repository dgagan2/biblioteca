/* eslint-disable no-useless-catch */
import { ApolloServer, gql } from 'apollo-server'
import { prisma } from '../prisma/clientPrisma.js'
import { createUser } from './mutation/createUser.js'
import { createRole, createState } from './mutation/user/create.js'
import { createAuthor, createEditorial, createGender, createLanguage, createLocation } from './mutation/book/create.js'
import { createBook } from './mutation/book/createBooks.js'
// Query
const typeDefs = gql`
  type Query {
    bookCount: Int!
    allbooks: [Book!]!
    booksByName(searchString: String!): [Book!]!
    allEditorial: [Editorial!]!
    editorialByName(searchString: String!): [Editorial!]!
    allAuthors: [Author!]!
    authorByName(searchedAuthor: String!): [Author!]!
    allGender: [Gender!]!
    genderByName(searchedGender: String!): [Gender!]!
    allLocation:[Location!]!
    locationByName(searchedLocation: String!): [Location!]!
    allUsers: [User!]!
  }

  type Book {
    id: Int!
    name: String!
    description: String
    editorialId: [Editorial]
    authorId: [Author]
    genderId: [Gender]
    nPages: Int
    editionYear: String
    price: Float
    idLocation: Int
    nEdition: Int
    stock: Int
    languageId: [Language]
    bookCode: String
    caratula: String
    location: Location
    lending: [Lending]
    createdAt: DateTime
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Editorial {
    id: Int!
    name: String!
    phoneNumber: String
    city: String
    books: [Book!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Author {
    id: Int!
    name: String!
    surname: String
    nacionality: String
    profilePicture: String
    books: [Book!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Gender {
    id: Int!
    gender: String!
    books: [Book!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Location {
    id: Int!
    shelfNumber: String!
    books: [Book!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Language {
    id: Int!
    name: String!
    books: [Book!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type AudBook {
    id: Int!
    nameBook: String!
    codeBook: String!
    editedField: String!
    createdAt: DateTime!
  }

  type Lending {
    id: Int!
    books:[Book!]!
    idUser: String!
    user: User!
    createdAt: DateTime 
    returnAt: DateTime
    userSession: String
    state: String
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Profile {
    name: String!
    surname: String
    residence: String
    phoneNumber: String
    age: Int
    idUser: String
    updateAt: DateTime
    deletedAd: DateTime
    user: User!
  }

  type User{
    id: String!
    email: String!
    password: String!
    idRole: Int!
    role: Role!
    idState: Int!
    state: State!
    profile: Profile
    lending: [Lending]
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Role{
    id: Int!
    role: String!
    idUser: [User!]!
    createdAt: DateTime
    updateAt: DateTime
    deletedAd: DateTime
  }

  type State{
    id: Int
    state: String!
    idUser: [User!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type AudLogin {
    id: Int!
    user: String!
    dateLogin: DateTime!
    dateLogout: DateTime
  }
  scalar DateTime

  type Mutation{
    createUser(input: CreateUserInput!): User!
    createRole(input: CreateRoleInput!): Role!
    createState(input: CreateStateInput!): State!
    createLanguage(input: CreateLanguageInput!): Language!
    createLocation(input: CreateLocationInput!): Location!
    createGender(input: CreateGenderInput!): Gender!
    createAuthor(input: CreateAuthorInput!): Author!
    createEditorial(input: CreateEditorialInput!): Editorial!
    createBook(input: CreateBookInput!): Book!
  }
  input CreateUserInput{
    email: String!
    password: String!
    name: String!
    surname: String
    residence: String
    phoneNumber: String
    age: Int
    updateAt: DateTime
    deletedAd: DateTime
  }
  input CreateRoleInput{
    role: String!
  }
  input CreateStateInput{
    state: String!
  }
  input CreateLanguageInput{
    name: String!
  }
  input CreateLocationInput{
    shelfNumber: String!
  }
  input CreateGenderInput{
    gender: String!
  }
  input CreateAuthorInput{
    name: String!
    surname: String!
    nacionality: String
    profilePicture: String
  }
  input CreateEditorialInput{
    name: String!
    phoneNumber: String
    city: String
  }
  input CreateBookInput{
    name: String!
    description: String
    editorialId: Int
    authorId: Int
    genderId: Int
    nPages: Int
    editionYear: String
    price: Float
    idLocation: Int
    nEdition: Int
    stock: Int
    languageId: Int
    bookCode: String
    caratula: String
  }
  
`

// Resolver
const resolvers = {
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

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})
// Se inicializa el server
server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
