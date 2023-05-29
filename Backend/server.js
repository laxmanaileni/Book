
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require('./graphql/schema');
const {resolvers}=require('./graphql/resolvers');

async function startApolloServer() {
const prisma = new PrismaClient();
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { prisma },
    formatError: (error) => {
      console.error(error); 
      return new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
    },
  });

await server.start();
server.applyMiddleware({ app });

const httpServer = app.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});

return { server, httpServer };
}

startApolloServer().catch((err) => {
    console.error("Error is "+err);
  });

