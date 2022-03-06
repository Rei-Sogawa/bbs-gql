import { ApolloServer } from "apollo-server-express";
import express from "express";
import { readFileSync } from "fs";
import expressPlayground from "graphql-playground-middleware-express";
import { resolvers } from "./resolvers";

const typeDefs = readFileSync("./typeDefs.graphql", "utf-8");

async function start() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.start().then(() => {
    server.applyMiddleware({ app });
  });

  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  app.listen({ port: process.env.PORT || 8080 }, () =>
    console.log("GraphQL Server started!")
  );
}

start();
