import { gql } from "@apollo/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { TopicItemFragment } from "../graphql/generated";
import { routes } from "../routes";

gql`
  fragment TopicItem on Topic {
    id
    title
    createdAt
  }
`;

type TopicItemProps = {
  topic: TopicItemFragment;
};

export const TopicItem = ({ topic }: TopicItemProps) => {
  return (
    <div>
      <Link to={routes["/topics/:topicId"].path({ topicId: topic.id })} className="link link-primary text-lg">
        {topic.title}
      </Link>
      <div className="text-gray-500">{format(new Date(topic.createdAt), "yyyy-MM-dd HH:mm")}</div>
    </div>
  );
};
