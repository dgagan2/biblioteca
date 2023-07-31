import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    bookCount: Int!
    allbooks: [Book!]!
    booksByName(searchString: String!): [Book!]!
    allEditorial: [Editorial!]!
    editorialByName(searchString: String!): [Editorial!]!
    allAuthors: [Author!]!
    authorByName(searchedAuthor: String!): [Author!]!
    allGender: [Gender!]!
    genderByName(searchedGender: String!): [Gender!]!
    allLocation:[Location!]!
    locationByName(searchedLocation: String!): [Location!]!
    allUsers: [User!]!
    userByEmail(searchedEmail: String!): [User!]!
    userById(searchedId: String!): [User!]!
    userByName(searchedName: String!): [Profile!]!
    login(email:String!, password: String!):AuthPayload
  }
  type AuthPayload {
    user: User!
    token: String!
  }
  type Book {
    id: Int!
    name: String!
    description: String
    editorialId: [Editorial]
    authorId: [Author]
    genderId: [Gender]
    nPages: Int
    editionYear: String
    price: Float
    idLocation: Int
    nEdition: Int
    stock: Int
    languageId: [Language]
    bookCode: String
    caratula: String
    location: Location
    lending: [Lending]
    createdAt: DateTime
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Editorial {
    id: Int!
    name: String!
    phoneNumber: String
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
    profilePicture: String
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
    shelfNumber: String!
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
    nameBook: String!
    codeBook: String!
    editedField: String!
    createdAt: DateTime!
  }

  type Lending {
    id: Int!
    books:[Book!]!
    idUser: String!
    user: User!
    createdAt: DateTime 
    returnAt: DateTime
    userSession: String
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
    idUser: String
    updateAt: DateTime
    deletedAd: DateTime
    user: User!
  }

  type User{
    id: String!
    email: String!
    password: String
    idRole: Int!
    role: Role!
    idState: Int!
    state: State!
    profile: Profile
    lending: [Lending]
    updateAt: DateTime
    deletedAd: DateTime
  }

  type Role{
    id: Int!
    role: String!
    idUser: [User!]!
    createdAt: DateTime
    updateAt: DateTime
    deletedAd: DateTime
  }

  type State{
    id: Int
    state: String!
    idUser: [User!]!
    createdAt: DateTime!
    updateAt: DateTime
    deletedAd: DateTime
  }

  type AudLogin {
    id: Int!
    user: String!
    dateLogin: DateTime!
    dateLogout: DateTime
  }
  scalar DateTime

  type Mutation{
    createUser(input: CreateUserInput!): User! 
    createRole(input: CreateRoleInput!): Role!
    createState(input: CreateStateInput!): State!
    createLanguage(input: CreateLanguageInput!): Language!
    createLocation(input: CreateLocationInput!): Location!
    createGender(input: CreateGenderInput!): Gender!
    createAuthor(input: CreateAuthorInput!): Author!
    createEditorial(input: CreateEditorialInput!): Editorial!
    createBook(input: CreateBookInput!): Book!
    createLending(input: CreateLendingInput!): Lending!
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
  input CreateRoleInput{
    role: String!
  }
  input CreateStateInput{
    state: String!
  }
  input CreateLanguageInput{
    name: String!
  }
  input CreateLocationInput{
    shelfNumber: String!
  }
  input CreateGenderInput{
    gender: String!
  }
  input CreateAuthorInput{
    name: String!
    surname: String!
    nacionality: String
    profilePicture: String
  }
  input CreateEditorialInput{
    name: String!
    phoneNumber: String
    city: String
  }
  input CreateBookInput{
    name: String!
    description: String
    editorialId: Int
    authorId: Int
    genderId: Int
    nPages: Int
    editionYear: String
    price: Float
    idLocation: Int
    nEdition: Int
    stock: Int
    languageId: Int
    bookCode: String
    caratula: String
  }
  input CreateLendingInput{
    books: [Int!]!
    idUser: String
    userSession: String
  }
  
`
