import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode, VFC } from "react";

const httpLink = createHttpLink({ uri: import.meta.env.VITE_ENDPOINT });

const authLink = (token: string | undefined = undefined) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
};

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

type ApolloProps = {
  children: ReactNode;
};

export const Apollo: VFC<ApolloProps> = ({ children }) => {
  const client = new ApolloClient({
    link: authLink().concat(httpLink),
    cache,
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
