import { gql } from "@apollo/client";
import { VFC } from "react";

import { useFetchTotalPhotosQuery } from "../graphql/generated";

gql`
  query fetchTotalPhotos {
    totalPhotos
  }
`;

export const Index: VFC = () => {
  const { data } = useFetchTotalPhotosQuery();
  return <div>{data?.totalPhotos}</div>;
};
