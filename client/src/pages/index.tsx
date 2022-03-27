import { VFC } from "react";

import { AppContainer } from "../components/AppContainer";
import { AppHeading } from "../components/AppHeading";
import { AppLayout } from "../components/AppLayout";
import { PaginateButtons } from "../components/PaginateButtons";
import { TopicItem } from "../components/topic/TopicItem";
import { useTopics } from "../hooks/useTopics";

export const Index: VFC = () => {
  const { edges, pageInfo, onFirst, onPrevious, onNext, onLast } = useTopics();

  return (
    <AppLayout>
      <AppContainer size="md">
        <div className="flex flex-col space-y-2">
          <div className="text-center">
            <AppHeading>Topics!</AppHeading>
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
      </AppContainer>
    </AppLayout>
  );
};
