import { gql } from "@apollo/client";
import { format } from "date-fns";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AppContainer } from "../../../components/AppContainer";
import { AppHeading } from "../../../components/AppHeading";
import { AppLayout } from "../../../components/AppLayout";
import { useAuth } from "../../../contexts/Auth";
import { Topic as ITopic, TopicForTopicDetailFragment } from "../../../graphql/generated";
import { useDeleteTopic, useTopic } from "../../../hooks/useTopics";
import { routes } from "../../../routes";

const TopicMenu = (props: { topic: Pick<ITopic, "id"> }) => {
  const navigate = useNavigate();

  const deleteTopic = useDeleteTopic();
  const onDelete = async () => {
    await deleteTopic({ variables: { id: props.topic.id } });
    navigate(routes["/"].path());
  };

  const onEdit = () => {
    navigate(routes["/topics/:topicId/edit"].path({ topicId: props.topic.id }));
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-xs border-gray-200">
          <FaEllipsisV />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
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
        </ul>
      </div>
    </div>
  );
};

gql`
  fragment TopicForTopicDetail on Topic {
    id
    title
    description
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
    <div className="p-4 border rounded-md">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <AppHeading>{topic.title}</AppHeading>
          {topic.user.id === uid && <TopicMenu topic={topic} />}
        </div>

        <div className="flex space-x-4 items-center">
          <div className="font-bold">{topic.user.displayName}</div>
          <div className="text-gray-500 text-sm">{format(new Date(topic.createdAt), "yyyy/MM/dd HH:mm")}</div>
        </div>

        <div className="whitespace-pre-line">{topic.description}</div>
      </div>
    </div>
  );
};

export const Topic = () => {
  const { topicId } = useParams();
  const topic = useTopic(topicId!);

  return (
    <AppLayout>
      <AppContainer size="md">
        {topic && (
          <div className="flex flex-col">
            <div className="text-center">
              <AppHeading>{topic.title}</AppHeading>
            </div>
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to={routes["/"].path()}>Home</Link>
                </li>
                <li>{topic.title}</li>
              </ul>
            </div>
            <TopicDetail topic={topic} />
          </div>
        )}
      </AppContainer>
    </AppLayout>
  );
};
