import { VFC } from "react";

import { AppContainer } from "../components/AppContainer";
import { AppHeading } from "../components/AppHeading";
import { AppLayout } from "../components/AppLayout";
import { TopicItem } from "../components/TopicItem";
import { useTopics } from "../hooks/useTopics";

export const Index: VFC = () => {
  const { edges } = useTopics({ first: 10 });

  return (
    <AppLayout>
      <AppContainer size="md">
        <div className="flex flex-col space-y-2">
          <div className="text-center">
            <AppHeading>Topics!</AppHeading>
          </div>
          <div>
            {edges?.map(({ node: topic }) => (
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
