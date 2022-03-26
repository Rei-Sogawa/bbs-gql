import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

import { TopicItemFragment } from "../../graphql/generated";
import { routes } from "../../routes";
import { AppHeading } from "../AppHeading";
import { Time } from "../Time";

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
        <AppHeading>{topic.title}</AppHeading>
      </Link>
      <Time time={topic.createdAt} />
    </div>
  );
};
