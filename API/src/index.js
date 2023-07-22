/* eslint-disable no-useless-catch */
import { ApolloServer, gql } from 'apollo-server'
import { prisma } from '../prisma/clientPrisma.js'
import { createUser } from './mutation/createUser.js'
import { createRole, createState } from './mutation/user/create.js'
import { createGender, createLanguage } from './mutation/book/create.js'
// Query
const typeDefs = gql`
  type Query {
    books: [Book!]!
    bookCount: Int!
    allbooks: [Book!]!
    booksByName(searchString: String!): [Book!]!
    allUsers: [User!]!
  }

  type Book {
    id: Int!
    name: String!
    description: String
    editorial: [Editorial]
    author: [Author]
    gender: [Gender]
    n_pages: Int
    edition_year: String
    price: Float
    id_location: Int
    n_edition: Int
    stock: Int
    language: [Language]
    book_code: String
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
    phone_number: String
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
    profile_picture: String
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
    name_book: String!
    code_book: String!
    edited_field: String!
    createdAt: DateTime!
  }

  type Lending {
    id: Int!
    books:[Book!]!
    idUser: String!
    user: User!
    createdAt: DateTime 
    returnAt: DateTime
    user_session: String
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
    id_role: Int!
    role: Role!
    id_state: Int!
    state: State!
    profile: Profile
    lending: [Lending]
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Role{
    id: Int!
    role: String!
    id_user: [User!]!
    createdAt: DateTime
    updateAt: DateTime
    deletedAd: DateTime
  }

  type State{
    id: Int
    state: String!
    id_user: [User!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type AudLogin {
    id: Int!
    user: String!
    date_login: DateTime!
    date_logout: DateTime
  }
  scalar DateTime

  type Mutation{
    createUser(input: CreateUserInput!): User!
    createRole(input: CreateRoleInput!): Role!
    createState(input: CreateStateInput!): State!
    createLanguage(input: CreateLanguageInput!): Language!
    createLocation(input: CreateLocationInput!): Location!
    createGender(input: CreateGenderInput!): Gender!
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
  
`

// Resolver
const resolvers = {
  Query: {
    bookCount: async (_, __, { prisma }) => {
      const bookCount = await prisma.book.count()
      return bookCount
    },
    allbooks: async (_, __, { prisma }) => {
      const allbooks = await prisma.book.findMany()
      return allbooks
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
        const newLanguage = await createLanguage(input, prisma)
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
