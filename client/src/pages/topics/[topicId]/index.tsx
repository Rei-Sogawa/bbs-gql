import { gql } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AppContainer } from "../../../components/AppContainer";
import { AppEllipsisMenu } from "../../../components/AppEllipsisMenu";
import { AppHeading } from "../../../components/AppHeading";
import { AppLayout } from "../../../components/AppLayout";
import { RootCommentItem } from "../../../components/comment/RootCommentItem";
import { Content } from "../../../components/Content";
import { Time } from "../../../components/Time";
import { UserName } from "../../../components/UserName";
import { useAuth } from "../../../contexts/Auth";
import { Topic as ITopic, TopicForTopicDetailFragment } from "../../../graphql/generated";
import { useRootComments } from "../../../hooks/useRootComments";
import { useDeleteTopic, useTopic } from "../../../hooks/useTopics";
import { routes } from "../../../routes";

const BreadCrumbs = ({ topic }: { topic: Pick<ITopic, "title"> }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to={routes["/"].path()}>Home</Link>
        </li>
        <li>{topic.title}</li>
      </ul>
    </div>
  );
};

const TopicMenu = ({ topic }: { topic: Pick<ITopic, "id"> }) => {
  const navigate = useNavigate();

  const deleteTopic = useDeleteTopic();
  const onDelete = async () => {
    await deleteTopic({ variables: { id: topic.id } });
    navigate(routes["/"].path());
  };

  const onEdit = () => {
    navigate(routes["/topics/:topicId/edit"].path({ topicId: topic.id }));
  };

  return (
    <AppEllipsisMenu>
      <li>
        <button className="btn btn-ghost" onClick={onEdit}>
          Edit
        </button>
      </li>
      <li>
        <button className="btn btn-ghost" onClick={onDelete}>
          Delete
        </button>
      </li>
    </AppEllipsisMenu>
  );
};

gql`
  fragment TopicForTopicDetail on Topic {
    id
    title
    content
    createdAt
    user {
      id
      displayName
    }
  }
`;

type TopicDetailProps = {
  topic: TopicForTopicDetailFragment;
};

const TopicDetail = ({ topic }: TopicDetailProps) => {
  const { uid } = useAuth();

  return (
    <div className="p-4 border rounded">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <AppHeading>{topic.title}</AppHeading>
          {topic.user.id === uid && <TopicMenu topic={topic} />}
        </div>

        <div className="flex items-baseline space-x-4">
          <UserName userName={topic.user.displayName} />
          <Time time={topic.createdAt} />
        </div>

        <Content content={topic.content} />
      </div>
    </div>
  );
};

export const Topic = () => {
  const { topicId } = useParams();

  const topic = useTopic(topicId!);

  const [paginate, setPaginate] = useState<{ first: number; after?: string | null }>({ first: 10, after: undefined });

  const {
    edges: rootCommentEdges,
    pageInfo: rootCommentPageInfo,
    fetchMore,
  } = useRootComments(topicId!, {
    first: paginate.first,
    after: paginate.after,
  });

  const onMore = () => {
    setPaginate({ first: 10, after: rootCommentPageInfo?.endCursor });
    fetchMore();
  };

  return (
    <AppLayout>
      <AppContainer size="md">
        {topic && (
          <div className="flex flex-col space-y-4">
            <div>
              <div className="ml-2">
                <BreadCrumbs topic={topic} />
              </div>
              <TopicDetail topic={topic} />
            </div>

            {rootCommentEdges && (
              <div className="flex flex-col space-y-2">
                {rootCommentEdges.map(({ node }) => (
                  <RootCommentItem key={node.id} comment={node} />
                ))}
              </div>
            )}

            {rootCommentPageInfo && (
              <div className="flex justify-center">
                <button className="btn btn-primary" disabled={!rootCommentPageInfo.hasNextPage} onClick={onMore}>
                  More Comments
                </button>
              </div>
            )}
          </div>
        )}
      </AppContainer>
    </AppLayout>
  );
};
