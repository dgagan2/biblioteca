import { loginRouter } from './login/loginRoute.js'
// import passport from 'passport'

export const routerAPI = (app) => {
  app.use('/login', loginRouter)
  // app.use('/graphql', passport.authenticate('jwt', { session: false }), startApollo)
  app.use('*', (req, res) => res.status(404).send('Not found'))
}
