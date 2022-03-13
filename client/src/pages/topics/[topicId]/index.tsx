import { gql } from "@apollo/client";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";

import { AppLayout } from "../../../components/AppLayout";
import { TopicForTopicDetailFragment, useTopicQuery } from "../../../graphql/generated";
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
  return (
    <div className="card border">
      <div className="card-body">
        <div className="card-title">{topic.title}</div>
        <div className="flex space-x-4">
          <div className="font-bold">{topic.user.displayName}</div>
          <div className="text-gray-500">{format(new Date(topic.createdAt), "yyyy/MM/dd HH:mm")}</div>
        </div>
        <div>{topic.description}</div>
      </div>
    </div>
  );
};

gql`
  query Topic($id: ID!) {
    topic(id: $id) {
      id
      ...TopicForTopicDetail
    }
  }
`;

export const Topic = () => {
  const { topicId } = useParams();
  const { data } = useTopicQuery({ variables: { id: topicId! } });
  const topic = data?.topic;

  return (
    <AppLayout>
      <div className="w-screen-md mx-auto my-6">
        {topic && (
          <div className="flex flex-col">
            <div className="text-lg font-bold text-center">{topic.title}</div>
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
