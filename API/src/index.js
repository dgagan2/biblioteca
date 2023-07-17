import { ApolloServer } from 'apollo-server'
import { PrismaClient, gql } from '@prisma/client'
import * as book from './modules/book.resolver'

const prisma = new PrismaClient()
// Query
const typeDefs = gql{
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
  
  type Lending {
    # Define los campos de Lending aquí
  }
  
  scalar DateTime
}
// Resolver
const resolvers = {

}
// Server
const server = new ApolloServer({
  typeDefs,
  resolvers
})
// Se inicializa el server
server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
