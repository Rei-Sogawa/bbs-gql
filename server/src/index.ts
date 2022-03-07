import { ApolloServer } from "apollo-server-express";
import express from "express";
import { readFileSync } from "fs";
import expressPlayground from "graphql-playground-middleware-express";

import { getDb } from "./firebase-app";
import { FirestoreDataSource } from "./lib/datasource/datasource";
import { Converter } from "./lib/datasource/helper";
import { IUser } from "./lib/entity/user";
import { resolvers } from "./resolvers";

const typeDefs = readFileSync("./typeDefs.graphql", "utf-8");

async function start() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      console.log("--- in dataSources initialized ---");
      const db = getDb();
      const usersRef = db.collection("users").withConverter(Converter<IUser>());
      class UserApi extends FirestoreDataSource<IUser> {}
      return {
        userApi: new UserApi(usersRef),
      };
    },
    context: () => {
      console.log("--- context initialized ---");
      return {};
    },
  });

  server.start().then(() => {
    server.applyMiddleware({ app });
  });

  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  app.listen({ port: process.env.PORT || 8080 }, () => console.log("GraphQL Server started!"));
}

start();
