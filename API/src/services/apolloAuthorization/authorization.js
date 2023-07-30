// authorization.js
import { allow, shield, and } from 'graphql-shield'
import passport from 'passport'
// Definir una regla para verificar si el usuario está autenticado (usando Passport)

export const isAuthenticated = (parent, args, context) => {
  console.log('entro')
  return passport.authenticate('jwt', { session: false })(context.req, context.res, context.next)
}

// Definir una regla para verificar si el usuario tiene un rol específico
const hasRole = (role) => (parent, args, { user }) => {
  return user && user.role === role
}

export const permissions = shield({
  Query: {
    // Permitir que cualquier usuario autenticado realice consultas públicas
    publicQuery: isAuthenticated,
    // Permitir que solo los usuarios con el rol 'admin' realicen consultas privadas
    privateQuery: and(isAuthenticated, hasRole('admin')),
    allUsers: [isAuthenticated, hasRole('admin')],
    login: [isAuthenticated, hasRole('admin')]
  },
  Mutation: {
    // Permitir que cualquier usuario autenticado realice mutaciones públicas
    publicMutation: allow,
    // Permitir que solo los usuarios con el rol 'admin' realicen mutaciones privadas
    createUser: [isAuthenticated, hasRole('admin')],
    createRole: [isAuthenticated, hasRole('admin')],
    createState: [isAuthenticated, hasRole('admin')],
    createLanguage: [isAuthenticated, hasRole('admin')],
    createLocation: [isAuthenticated, hasRole('admin')],
    createGender: [isAuthenticated, hasRole('admin')],
    createAuthor: [isAuthenticated, hasRole('admin')],
    createEditorial: [isAuthenticated, hasRole('admin')],
    createBook: [isAuthenticated, hasRole('admin')]
  }
})
