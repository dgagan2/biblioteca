import { ApolloServer, gql } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// Query
const typeDefs = gql`
  type Query {
    books: [Book!]!
    book(id: Int!): Book
    editorials: [Editorial!]!
    editorial(id: Int!): Editorial
    authors: [Author!]!
    author(id: Int!): Author
    genders: [Gender!]!
    gender(id: Int!): Gender
    locations: [Location!]!
    location(id: Int!): Location
    languages: [Language!]!
    language(id: Int!): Language
    users: [User!]!
    user(id: Int!): User
    roles: [Role!]!
    role(id: Int!): Role
    bookCount: Int!

  }

  type Book {
    id: Int!
    name: String!
    description: String
    editorial: [Editorial!]!
    author: [Author!]!
    gender: [Gender!]!
    n_pages: Int
    edition_year: String
    price: Float
    id_location: Int!
    n_edition: Int
    stock: Int!
    language: [Language!]!
    book_code: String!
    caratula: [String!]!
    location: Location!
    lending: [Lending!]!
    createdAt: DateTime!
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
    id_user: Int!
    createdAt: DateTime 
    returnAt: DateTime
    user_session: String
    state: String
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Profile {
    name: String
    surname: String
    residence: String
    phone_number: String
    age: Int
    id_user: Int!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
    user: User
  }

  type User{
    id: Int!
    email: String!
    password: String!
    id_role: Role
    id_state: State
    profile: Profile
    lending: [Lending!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Role{
    id: Int!
    role: String!
    id_user: Int!
    user: User!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type State{
    id: Int!
    state: String!
    id_user: Int!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
    user: User
  }

  type AudLogin {
    id: Int!
    user: String!
    date_login: DateTime!
    date_logout: DateTime
  }
  scalar DateTime
`

// Resolver
const resolvers = {
  Query: {
    bookCount: async (_, __, { prisma }) => {
      const bookCount = await prisma.book.count()
      return bookCount
    },
    books: async (_, __, { prisma }) => {
      return prisma.book.findMany()
    },
    book: async (_, { id }, { prisma }) => {
      return prisma.book.findUnique({
        where: { id }
      })
    },
    editorials: async (_, __, { prisma }) => {
      return prisma.editorial.findMany()
    },
    editorial: async (_, { id }, { prisma }) => {
      return prisma.editorial.findUnique({
        where: { id }
      })
    },
    authors: async (_, __, { prisma }) => {
      return prisma.author.findMany()
    },
    author: async (_, { id }, { prisma }) => {
      return prisma.author.findUnique({
        where: { id }
      })
    },
    genders: async (_, __, { prisma }) => {
      return prisma.gender.findMany()
    },
    gender: async (_, { id }, { prisma }) => {
      return prisma.gender.findUnique({
        where: { id }
      })
    },
    locations: async (_, __, { prisma }) => {
      return prisma.location.findMany()
    },
    location: async (_, { id }, { prisma }) => {
      return prisma.location.findUnique({
        where: { id }
      })
    },
    languages: async (_, __, { prisma }) => {
      return prisma.language.findMany()
    },
    language: async (_, { id }, { prisma }) => {
      return prisma.language.findUnique({
        where: { id }
      })
    }
  },
  Book: {
    editorial: async (parent, _, { prisma }) => {
      return prisma.editorial.findMany({
        where: { id: parent.id }
      })
    },
    author: async (parent, _, { prisma }) => {
      return prisma.author.findMany({
        where: { id: parent.id }
      })
    },
    gender: async (parent, _, { prisma }) => {
      return prisma.gender.findMany({
        where: { id: parent.id }
      })
    },
    location: async (parent, _, { prisma }) => {
      return prisma.location.findUnique({
        where: { id: parent.id_location }
      })
    },
    language: async (parent, _, { prisma }) => {
      return prisma.language.findMany({
        where: { id: parent.id }
      })
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
