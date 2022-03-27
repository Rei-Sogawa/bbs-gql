import { gql } from "@apollo/client";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CommentForm, CommentFormProps } from "../../../components/comment/CommentForm";
import { CommentFormBeforeLogIn } from "../../../components/comment/CommentFormBeforeLogin";
import { RootCommentItem } from "../../../components/comment/RootCommentItem";
import { Layout } from "../../../components/layout/Layout";
import { Container } from "../../../components/shared/Container";
import { Content } from "../../../components/shared/Content";
import { EllipsisMenu } from "../../../components/shared/EllipsisMenu";
import { Heading } from "../../../components/shared/Heading";
import { Time } from "../../../components/shared/Time";
import { UserName } from "../../../components/shared/UserName";
import { useAuth } from "../../../contexts/Auth";
import { Topic as ITopic, TopicForTopicDetailFragment } from "../../../graphql/generated";
import { useCreateRootComment, useRootComments } from "../../../hooks/useComments";
import { useDeleteTopic, useTopic } from "../../../hooks/useTopics";
import { routes } from "../../../routes";
import { assertIsDefined } from "../../../util/assert";

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
    <EllipsisMenu>
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
    </EllipsisMenu>
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
        <div className="flex items-center space-x-4">
          <button className="btn btn-circle btn-sm">
            <FaUser size="16" />
          </button>
          <div>
            <UserName userName={topic.user.displayName} />
            <Time time={topic.createdAt} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Heading>{topic.title}</Heading>
          {topic.user.id === uid && <TopicMenu topic={topic} />}
        </div>
        <Content content={topic.content} />
      </div>
    </div>
  );
};

type TopicViewProps = {
  topic: TopicForTopicDetailFragment;
};

const TopicView = ({ topic }: TopicViewProps) => {
  const { uid } = useAuth();

  const { rootCommentEdges, rootCommentPageInfo, fetchMoreRootComments } = useRootComments(topic.id);

  const createRootComment = useCreateRootComment({ parent: topic });
  const initialValues: CommentFormProps["initialValues"] = {
    content: "",
  };
  const onSubmit: CommentFormProps["onSubmit"] = async ({ content }) => {
    await createRootComment({ content });
  };

  return (
    <Layout>
      <Container size="md">
        <div className="flex flex-col space-y-4">
          <div>
            <div className="ml-2">
              <BreadCrumbs topic={topic} />
            </div>
            <TopicDetail topic={topic} />
          </div>

          <div>{uid ? <CommentForm {...{ initialValues, onSubmit }} /> : <CommentFormBeforeLogIn />}</div>

          {rootCommentEdges && (
            <div className="flex flex-col space-y-2">
              {rootCommentEdges.map(({ node }) => (
                <RootCommentItem key={node.id} comment={node} />
              ))}
            </div>
          )}

          {rootCommentPageInfo && (
            <div className="flex justify-center">
              <button
                className="btn btn-primary"
                disabled={!rootCommentPageInfo.hasNextPage}
                onClick={fetchMoreRootComments}
              >
                More Comments
              </button>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export const Topic = () => {
  const { topicId } = useParams();
  assertIsDefined(topicId);
  const topic = useTopic(topicId);

  return topic ? <TopicView topic={topic} /> : null;
};
