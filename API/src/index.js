import { ApolloServer, gql } from 'apollo-server'

// Query
const typeDefs = gql`
    type Query{
        info: String!
    }
`
// Resolver
const resolvers = {
  Query: {
    info: () => 'This is the API biblioteca'
  }
}
// Server
const server = new ApolloServer({
  typeDefs,
  resolvers
})
// Se inicializa el server
server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
