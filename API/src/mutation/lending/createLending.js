export const createLending = async (input, prisma, user) => {
  if (input.books.length <= 0) {
    throw new Error('Debe agregar al menos un libro al prestamo')
  }
  const id = user.sub
  const validateUser = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      email: true,
      state: true
    }
  })
  if (!validateUser) {
    throw new Error('Usuario no valido')
  }
  if (validateUser.state.state === 'disable') {
    throw new Error('El usuario no esta activo')
  }
  const newLending = await prisma.lending.create({
    data: {
      books: { connect: input.books.map((bookId) => ({ id: bookId })) },
      idUser: id,
      userSession: validateUser.email,
      state: 'prestado'
    },
    include: {
      books: true,
      user: true
    }
  })
  return newLending
}
