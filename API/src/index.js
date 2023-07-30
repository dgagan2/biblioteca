/* eslint-disable n/handle-callback-err */
/* eslint-disable no-useless-catch */
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { prisma } from '../prisma/clientPrisma.js'
import { typeDefs } from './typeDefs/typeDefs.js'
import { resolvers } from './resolvers/resolvers.js'
import { routerAPI } from './routes/indexRoutes.js'
import passport from 'passport'
import { permissions } from './services/apolloAuthorization/authorization.js'
import jwtStrategy from './services/strategies/jwt.strategy.js'

// Server
export const app = express()
app.use(express.json())
app.use(passport.initialize())
app.get('/', (req, res) => res.send('Welcome'))
passport.use(jwtStrategy)

export const authenticateMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json('No autorizado')
  }
  passport.authenticate('jwt', { session: false }, (err, payload) => {
    if (!payload) {
      return res.status(401).json('No está autorizado para acceder a este recurso')
    }
    req.user = payload // Almacenar el usuario en req.user
    next()
  })(req, res, next)
}

app.use('/graphql', authenticateMiddleware)

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
  routerAPI(app)
  // Archivo principal de manejo de rutas
  app.listen(3000, () => {
    console.log('Server is runing in port', 3000)
  })
}
// Se inicializa el server
start()
