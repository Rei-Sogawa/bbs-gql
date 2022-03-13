import { gql } from "@apollo/client";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";

import { AppHeading } from "../../../components/AppHeading";
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
        <AppHeading>{topic.title}</AppHeading>
        <div className="flex space-x-4 items-center">
          <div className="font-bold">{topic.user.displayName}</div>
          <div className="text-gray-500 text-sm">{format(new Date(topic.createdAt), "yyyy/MM/dd HH:mm")}</div>
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
