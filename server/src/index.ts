import { ApolloServer } from "apollo-server-express";
import express from "express";
import { readFileSync } from "fs";
import expressPlayground from "graphql-playground-middleware-express";

const typeDefs = readFileSync("./typeDefs.graphql", "utf-8");

async function start() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        totalPhotos: () => 42,
      },
    },
  });

  server.start().then(() => {
    server.applyMiddleware({ app });
  });

  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  app.listen({ port: 4000 }, () =>
    console.log(
      `GraphQL Server running at http://localhost:4000${server.graphqlPath}`
    )
  );
}

start();
