const resolvers = {
   Query: {
      books: async (_, __, { prisma }) => {
         return prisma.book_table.findMany();
      },
      book: async (_, { id }, { prisma }) => {
         return prisma.book_table.findUnique({ where: { id } });
      },
   },
   Mutation: {
      createBook: async (_, { title, author, publicationYear }, { prisma }) => {
        
         try {
            return prisma.book_table.create({
               data: { title, author, publicationYear },
            });
         } catch (error) {
            console.error(error);
            throw new ApolloError('Failed to create book', 'DATABASE_ERROR');
         }
      },
      updateBook: async (_, { id, title, author, publicationYear }, { prisma }) => {
         if (!id) {
            throw new UserInputError('Missing required field', { invalidArgs: ['id'] });
         }
         try {
            const existingBook = await prisma.book_table.findUnique({ where: { id } });
            if (!existingBook) {
               throw new UserInputError('Book not found', { invalidArgs: ['id'] });
            }
            return prisma.book_table.update({ where: { id }, data: { title, author, publicationYear } });
         } catch (error) {
            console.error(error);
            throw new ApolloError('Failed to update book', 'DATABASE_ERROR');
         }
      },
      deleteBook: async (_, { id }, { prisma }) => {
         if (!id) {
            throw new UserInputError('Missing required field', { invalidArgs: ['id'] });
         }
         try {
            const existingBook = await prisma.book_table.findUnique({ where: { id } });
            if (!existingBook) {
               throw new UserInputError('Book not found', { invalidArgs: ['id'] });
            }

            return prisma.book_table.delete({ where: { id } });
         } catch (error) {
            console.error(error);
            throw new ApolloError('Failed to delete book', 'DATABASE_ERROR');
         }
      },
   },
};

module.exports = { resolvers };
