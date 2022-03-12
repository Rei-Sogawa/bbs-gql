import { gql } from "@apollo/client";
import { useFetchTotalPhotosQuery } from "./graphql/generated";

gql`
  query fetchTotalPhotos {
    totalPhotos
  }
`;

export const App = () => {
  const { data } = useFetchTotalPhotosQuery();
  return (
    <div className="container mx-auto">
      <button className="btn">click me</button>
      <div>{data?.totalPhotos}</div>
    </div>
  );
};
