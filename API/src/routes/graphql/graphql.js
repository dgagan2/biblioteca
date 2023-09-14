import { prisma } from '../../../prisma/clientPrisma.js'
import { typeDefs } from '../../typeDefs/typeDefs.js'
import { resolvers } from '../../resolvers/resolvers.js'
import { ApolloServer } from 'apollo-server-express'
import { app } from '../../index.js'

// Creo el apollo server y le paso los type y resolver
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})

// apolloServer.start() // Inicializo servidor apollo
apolloServer.applyMiddleware({ app }) // Toma un objeto donde le paso el servidor
