import { VFC } from "react";
import { useNavigate } from "react-router-dom";

import { AppContainer } from "../components/AppContainer";
import { AppHeading } from "../components/AppHeading";
import { AppLayout } from "../components/AppLayout";
import { PaginateButtons } from "../components/PaginateButtons";
import { TopicItem } from "../components/TopicItem";
import { usePaginateQuery } from "../hooks/usePaginateQuery";
import { useTopics } from "../hooks/useTopics";
import { routes } from "../routes";

export const Index: VFC = () => {
  const { first, after, last, before } = usePaginateQuery();

  const navigate = useNavigate();
  const onFirst = () => {
    navigate(routes["/"].path() + "?first=10");
  };
  const onPrevious = () => {
    navigate(routes["/"].path() + "?last=10&before=" + pageInfo?.startCursor);
  };
  const onNext = () => {
    navigate(routes["/"].path() + "?first=10&after=" + pageInfo?.endCursor);
  };
  const onLast = () => {
    navigate(routes["/"].path() + "?last=10");
  };

  const { edges, pageInfo } = useTopics({
    first: first ? Number(first) : undefined,
    after,
    last: last ? Number(last) : undefined,
    before,
  });

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
