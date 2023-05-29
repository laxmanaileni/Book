const { ApolloServer } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');


const prisma = new PrismaClient();

describe('Apollo Server', () => {
  let server;
  let query;
  let mutate;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { prisma },
      formatError: (error) => {
        console.error(error);
        return new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
      },
    });

    await server.start();

    const testClient = createTestClient(server);
    query = testClient.query;
    mutate = testClient.mutate;
  });

  afterAll(async () => {
    await server.stop();
    await prisma.$disconnect();
  });

  it('returns all books', async () => {
    const GET_BOOKS_QUERY = `
      query {
        books {
          id
          title
          author
          publicationYear
        }
      }
    `;

    const { data } = await query({ query: GET_BOOKS_QUERY });

    expect(data.books).toBeDefined();
    expect(Array.isArray(data.books)).toBeTruthy();
  });

  it('creates a new book', async () => {
    const CREATE_BOOK_MUTATION = `
      mutation {
        createBook(title: "Test Book", author: "Test Author", publicationYear: 2023) {
          id
          title
          author
          publicationYear
        }
      }
    `;

    const { data } = await mutate({ mutation: CREATE_BOOK_MUTATION });

    expect(data.createBook).toBeDefined();
    expect(data.createBook.title).toBe('Test Book');
    expect(data.createBook.author).toBe('Test Author');
    expect(data.createBook.publicationYear).toBe(2023);
  });

  it('returns a specific book by ID', async () => {
    const GET_BOOK_QUERY = `
      query($id: ID!) {
        book(id: $id) {
          id
          title
          author
          publicationYear
        }
      }
    `;
  
    const variables = { id: '8a424020-1ca5-4768-8df0-b2f0c14b21b5' };
  
    const { data } = await query({ query: GET_BOOK_QUERY, variables });
  
    expect(data.book).toBeDefined();
    expect(data.book.id).toBe('8a424020-1ca5-4768-8df0-b2f0c14b21b5');
  });

  
   
  it('deletes a book successfully', async () => {
    const DELETE_BOOK_MUTATION = `
      mutation($id: ID!) {
        deleteBook(id: $id) {
          id
        }
      }
    `;
  
    const variables = { id: '8a424020-1ca5-4768-8df0-b2f0c14b21b5' };
  
    const { data } = await mutate({ mutation: DELETE_BOOK_MUTATION, variables });
  
    expect(data.deleteBook).toBeDefined();
    expect(data.deleteBook.id).toBe('8a424020-1ca5-4768-8df0-b2f0c14b21b5');
  });
  
});
