import { authenticateMiddleware } from '../index.js'
import { loginRouter } from './login/loginRoute.js'
// import passport from 'passport'

export const routerAPI = (app) => {
  app.use('/graphql', authenticateMiddleware)
  app.use('/login', loginRouter)
  app.use('*', (req, res) => res.status(404).send('Not found'))
}
