import { VFC } from "react";

import { AppContainer } from "../components/AppContainer";
import { AppHeading } from "../components/AppHeading";
import { AppLayout } from "../components/AppLayout";
import { TopicItem } from "../components/TopicItem";
import { useTopics } from "../hooks/useTopics";

export const Index: VFC = () => {
  const topics = useTopics();
  console.log(topics);
  return (
    <AppLayout>
      <AppContainer size="md">
        <div className="flex flex-col space-y-2">
          <div className="text-center">
            <AppHeading>Topics!</AppHeading>
          </div>
          <div>
            {topics.map((topic) => (
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
