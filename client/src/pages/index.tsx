import { gql } from "@apollo/client";
import { VFC } from "react";

import { AppLayout } from "../components/AppLayout";
import { useFetchTotalPhotosQuery } from "../graphql/generated";

gql`
  query fetchTotalPhotos {
    totalPhotos
  }
`;

export const Index: VFC = () => {
  const { data } = useFetchTotalPhotosQuery();
  return <AppLayout>{data?.totalPhotos}</AppLayout>;
};
