/* eslint-disable no-useless-catch */
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { prisma } from '../prisma/clientPrisma.js'
import { typeDefs } from './typeDefs/typeDefs.js'
import { resolvers } from './resolvers/resolvers.js'
import { routerAPI } from './routes/indexRoutes.js'
import passport from 'passport'
import { permissions } from './services/apolloAuthorization/authorization.js'

// Server
export const app = express()
app.use(express.json())
app.use(passport.initialize())
app.get('/', (req, res) => res.send('Welcome'))
// app.use('/static', express.static(path.join(__dirname, '../public')))
app.set('/graphql', passport.authenticate('jwt', { session: false }))
async function start () {
  // Creo el apollo server y le paso los type y resolver
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = req.user
      return { prisma, user }
    },
    plugins: [permissions] // Aplicar las reglas de autorización a Apollo Server
  })

  await apolloServer.start() // Inicializo servidor apollo
  apolloServer.applyMiddleware({ app }) // Toma un objeto donde le paso el servidor
  // Archivo principal de manejo de rutas
  routerAPI(app)
  app.listen(3000, () => {
    console.log('Server is runing in port', 3000)
  })
}
// Se inicializa el server
start()
