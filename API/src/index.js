/* eslint-disable no-useless-catch */

import { ApolloServer } from 'apollo-server-express'
import express from 'express'
// import path from 'node:path'
import { prisma } from '../prisma/clientPrisma.js'
import { typeDefs } from './typeDefs/typeDefs.js'
import { resolvers } from './resolvers/resolvers.js'

// Server
export const app = express()
app.get('/', (req, res) => res.send('Welcome'))
// app.use('/static', express.static(path.join(__dirname, '../public')))
async function start () {
  // Creo el apollo server y le paso los type y resolver
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      prisma
    }
  })

  await apolloServer.start() // Inicializo servidor apollo
  apolloServer.applyMiddleware({ app }) // Toma un objeto donde le paso el servidor
  app.use('*', (req, res) => res.status(404).send('Not found'))

  app.listen(3000, () => {
    console.log('Server is runing in port', 3000)
  })
}

// Se inicializa el server
start()
