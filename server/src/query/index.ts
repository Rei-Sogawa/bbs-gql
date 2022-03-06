import { Resolvers } from "./../graphql/generated";

export const Query: Resolvers["Query"] = {
  totalPhotos: () => 45,
};
