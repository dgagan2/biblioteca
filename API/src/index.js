import { ApolloServer, gql } from 'apollo-server'
import { prisma } from '../prisma/clientPrisma.js'
import { createUser } from './mutation/createUser.js'
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
    shelf_number: String!
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
    id: Int
    role: String
    id_user: [User!]!
    createdAt: DateTime
    updateAt: DateTime
    deletedAd: DateTime
  }

  type State{
    id: Int
    state: String
    id_user: [User!]!
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
