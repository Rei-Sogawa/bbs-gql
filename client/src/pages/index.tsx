import { VFC } from "react";

import { Layout } from "../components/layout/Layout";
import { Container } from "../components/shared/Container";
import { Heading } from "../components/shared/Heading";
import { PaginateButtons } from "../components/shared/PaginateButtons";
import { TopicItem } from "../components/topic/TopicItem";
import { useTopics } from "../hooks/useTopics";

export const Index: VFC = () => {
  const { edges, pageInfo, onFirst, onPrevious, onNext, onLast } = useTopics();

  return (
    <Layout>
      <Container size="md">
        <div className="flex flex-col space-y-2">
          <div className="text-center">
            <Heading>Topics!</Heading>
          </div>
          {edges && pageInfo && (
            <div>
              <div>
                {edges?.map(({ node: topic }) => (
                  <div key={topic.id}>
                    <TopicItem topic={topic} />
                    <div className="divider" />
                  </div>
                ))}
              </div>

              <PaginateButtons
                {...{
                  hasPrevious: pageInfo.hasPreviousPage,
                  hasNext: pageInfo.hasNextPage,
                  onFirst,
                  onPrevious,
                  onNext,
                  onLast,
                }}
              />
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};
