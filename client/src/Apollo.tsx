import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { ReactNode, VFC } from "react";

const httpLink = createHttpLink({ uri: import.meta.env.VITE_ENDPOINT });

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

type ApolloProps = {
  children: ReactNode;
};

export const Apollo: VFC<ApolloProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
