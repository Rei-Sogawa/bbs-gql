import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode, useMemo, VFC } from "react";

const httpLink = createHttpLink({ uri: import.meta.env.VITE_ENDPOINT });

const getAuthLink = (token: string | undefined = undefined) => {
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

const getClient = (token: string | undefined = undefined) => {
  return new ApolloClient({
    link: getAuthLink(token).concat(httpLink),
    cache,
  });
};

type ApolloProps = {
  children: ReactNode;
};

export const Apollo: VFC<ApolloProps> = ({ children }) => {
  const client = useMemo(() => getClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
