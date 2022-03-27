import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

import { TopicItemFragment } from "../../graphql/generated";
import { routes } from "../../routes";
import { Heading } from "../shared/Heading";
import { Time } from "../shared/Time";

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
      <Link to={routes["/topics/:topicId"].path({ topicId: topic.id })} className="link link-primary">
        <Heading>{topic.title}</Heading>
      </Link>
      <Time time={topic.createdAt} />
    </div>
  );
};
