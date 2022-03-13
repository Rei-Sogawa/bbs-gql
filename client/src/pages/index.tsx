import { gql } from "@apollo/client";
import { VFC } from "react";

import { AppContainer } from "../components/AppContainer";
import { AppHeading } from "../components/AppHeading";
import { AppLayout } from "../components/AppLayout";
import { TopicItem } from "../components/TopicItem";
import { useTopicsForIndexQuery } from "../graphql/generated";

gql`
  query TopicsForIndex {
    topics {
      id
      ...TopicItem
    }
  }
`;

export const Index: VFC = () => {
  const { data } = useTopicsForIndexQuery();
  const topics = data?.topics;

  return (
    <AppLayout>
      <AppContainer size="md">
        <div className="flex flex-col space-y-2">
          <div className="text-center">
            <AppHeading>Index Page!</AppHeading>
          </div>
          <div>
            {topics &&
              topics.map((topic) => (
                <div key={topic.id}>
                  <TopicItem topic={topic} />
                  <div className="divider" />
                </div>
              ))}
          </div>
        </div>
      </AppContainer>
    </AppLayout>
  );
};
