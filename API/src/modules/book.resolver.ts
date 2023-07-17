import { book, editorial, author, gender, location, language, aud_book } from '@prisma/client'
import type {PrismaClient} from '@prisma/client'

type resolverContext={
    prisma: PrismaClient
}
export function getAll(parent:unknown, arg:unknown, context: resolverContext): Promise<book[]>{
    return context.prisma.book.findMany()
}

export const resolver: Record<keyof (book & {
    editorial:editorial,
    author:author,
    gender: gender,
    id_location: location,
    language: language
}), 
(parent: book & {
    editorial:editorial,  
    author:author,
    gender: gender,
    id_location: location,
    language: language
} )=>unknown >={
    id: (parent)=> parent.id,
    name: (parent)=> parent.name,
    description:(parent)=> parent.description,
    editorial: (parent)=>({
        id: parent.editorial.id,
        name: parent.editorial.name,
        phone_number: parent.editorial.phone_number,
        city: parent.editorial.city,
        createdAt: parent.editorial.createdAt,
        updateAt: parent.editorial.updateAt,
        deletedAd: parent.editorial.updateAt
    }),
    author: (parent)=>({
        id: parent.author.id,
        name: parent.author.name,
        surname: parent.author.surname,
        nacionality: parent.author.nacionality,
        profile_picture: parent.author.profile_picture,
        createdAt: parent.author.createdAt,
        updateAt: parent.author.updateAt,
        deletedAd: parent.author.deletedAd
    }),
    gender: (parent)=>({
        id: parent.gender.id,
        gender: parent.gender.gender,
        createdAt: parent.gender.createdAt,
        updateAt: parent.gender.updateAt,
        deletedAd: parent.gender.deletedAd
    }),
    n_pages: (parent)=> parent.n_pages,
    edition_year: (parent)=> parent.edition_year,
    price: (parent)=> parent.price,
    id_location: (parent)=> parent.id_location,
    n_edition: (parent)=> parent.n_edition,
    stock: (parent)=> parent.stock,
    language: (parent)=> parent.language,
    book_code: (parent)=> parent.book_code,
    caratula: (parent)=> parent.caratula,
    createdAt: (parent)=> parent.createdAt,
    updateAt: (parent)=> parent.updateAt,
    deletedAd: (parent)=> parent.deletedAd
}
