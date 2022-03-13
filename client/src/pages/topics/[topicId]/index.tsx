import { gql } from "@apollo/client";
import { format } from "date-fns";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AppHeading } from "../../../components/AppHeading";
import { AppLayout } from "../../../components/AppLayout";
import { useAuth } from "../../../contexts/Auth";
import { TopicForTopicDetailFragment } from "../../../graphql/generated";
import { useDeleteTopic, useTopic } from "../../../hooks/useTopics";
import { routes } from "../../../routes";

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
  const navigate = useNavigate();

  const { uid } = useAuth();

  const deleteTopic = useDeleteTopic();
  const onDelete = async () => {
    await deleteTopic({ variables: { id: topic.id } });
    navigate(routes["/"].path());
  };

  const onEdit = () => {
    navigate(routes["/topics/:topicId/edit"].path({ topicId: topic.id }));
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <AppHeading>{topic.title}</AppHeading>
          {topic.user.id === uid && (
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
          )}
        </div>

        <div>
          <div className="flex space-x-4 items-center">
            <div className="font-bold">{topic.user.displayName}</div>
            <div className="text-gray-500 text-sm">{format(new Date(topic.createdAt), "yyyy/MM/dd HH:mm")}</div>
          </div>
          <div>{topic.description}</div>
        </div>
      </div>
    </div>
  );
};

export const Topic = () => {
  const { topicId } = useParams();
  const topic = useTopic(topicId!);

  return (
    <AppLayout>
      <div className="w-screen-md mx-auto my-6">
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
      </div>
    </AppLayout>
  );
};
