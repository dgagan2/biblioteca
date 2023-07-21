import { ApolloServer, gql } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { v1 as uuid } from 'uuid'
import { validarEmail, validarPassword } from './validateEmail.js'
const prisma = new PrismaClient()
// Query
const typeDefs = gql`
  type Query {
    books: [Book!]!
    bookCount: Int!
    allbooks: [Book!]!
    booksByName(searchString: String!): [Book!]!
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
    caratula: String
    location: Location!
    lending: [Lending]
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
    id_user: User
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
    idUser: User!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type User{
    id: String!
    email: String!
    password: String!
    id_role: Role
    id_state: State
    profile: Profile
    lending: [Lending]
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Role{
    id: Int!
    role: String!
    id_user: [User]
    updateAt: DateTime
    deletedAd: DateTime
  }

  type State{
    id: Int!
    state: String!
    id_user: User
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
    }
  },
  Mutation: {
    createUser: async (_, { input }, { prisma }) => {
      if (!isValidEmail(input.email)) {
        throw new Error('Correo electrónico inválido.')
      }
      if (await existsEmail(input.email) === true) {
        throw new Error('El correo ya existe.')
      }

      // Verificar que el campo de contraseña cumple con ciertos criterios de seguridad
      if (!isValidPassword(input.password)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, minúsculas y caracteres especiales.')
      }

      // Validar que los campos opcionales no exceden cierta longitud máxima
      if (input.name && input.name.length > 50) {
        throw new Error('El nombre debe tener menos de 50 caracteres.')
      }

      if (input.surname && input.surname.length > 50) {
        throw new Error('El apellido debe tener menos de 50 caracteres.')
      }
      if (Number.isInteger(parseInt(input.email)) || input.age < 0) {
        throw new Error('La edad debe ser un número entero positivo.')
      }

      const userId = uuid()
      const { email, password, surname, residence, name, phoneNumber, age } = input
      const newUser = await prisma.user.create({
        data: {
          id: userId,
          email,
          password,
          profile: {
            create: {
              name,
              surname,
              residence,
              phoneNumber,
              age
            }
          }
        },
        include: {
          profile: true
        }
      }
      )
      return newUser
    }

  }
}
// validar si el correo existe
const existsEmail = async (email) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: { equals: email } }
    })

    if (user) {
      return true
    } else {
      return false
    }
  } catch (error) {
    // Manejar el error si ocurre algún problema en la consulta
    console.error(error)
    throw error
  }
}
// Validar el formato del correo
const isValidEmail = (email) => {
  const esValido = validarEmail(email)
  if (esValido) {
    return true
  } else {
    return false
  }
}

// Función para validar la contraseña
function isValidPassword (password) {
  if (validarPassword === true) {
    return false
  }
  return true
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
