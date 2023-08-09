import { loginRouter } from './login/loginRoute.js'
import { signupRouter } from './signup/signupRoute.js'
// import passport from 'passport'

export const routerAPI = (app) => {
  app.get('/', (req, res) => res.send('Welcome'))
  app.use('/login', loginRouter)
  app.use('/signup', signupRouter)
  app.use('*', (req, res) => res.status(404).send('Not found'))
}
