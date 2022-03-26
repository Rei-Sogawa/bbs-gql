import { VFC } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AppContainer } from "../components/AppContainer";
import { AppHeading } from "../components/AppHeading";
import { AppLayout } from "../components/AppLayout";
import { TopicItem } from "../components/TopicItem";
import { useQuery } from "../hooks/useQuery";
import { useTopics } from "../hooks/useTopics";
import { routes } from "../routes";

const useIndexQuery = () => {
  const query = useQuery();
  const first = query.get("first");
  const after = query.get("after");
  const last = query.get("last");
  const before = query.get("before");
  return { first, after, last, before };
};

export const Index: VFC = () => {
  const { first, after, last, before } = useIndexQuery();
  const { edges, pageInfo } = useTopics({
    first: first ? Number(first) : undefined,
    after,
    last: last ? Number(last) : undefined,
    before,
  });
  const navigate = useNavigate();

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
          <div className="flex justify-center">
            <div className="btn-group">
              <button className="btn" onClick={() => navigate(routes["/"].path() + "?first=10")}>
                <FaAngleDoubleLeft />
              </button>
              <button
                className="btn"
                disabled={!pageInfo?.hasPreviousPage}
                onClick={() => navigate(routes["/"].path() + "?last=10&before=" + pageInfo?.startCursor)}
              >
                <FaAngleLeft />
              </button>
              <button className="btn btn-disabled">...</button>
              <button
                className="btn"
                disabled={!pageInfo?.hasNextPage}
                onClick={() => navigate(routes["/"].path() + "?first=10&after=" + pageInfo?.endCursor)}
              >
                <FaAngleRight />
              </button>
              <button className="btn" onClick={() => navigate(routes["/"].path() + "?last=10")}>
                <FaAngleDoubleRight />
              </button>
            </div>
          </div>
        </div>
      </AppContainer>
    </AppLayout>
  );
};
