import { gql } from "@apollo/client";

import { TopicItemFragment } from "../graphql/generated";

gql`
  fragment TopicItem on Topic {
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

type TopicItemProps = {
  topic: TopicItemFragment;
};

export const TopicItem = ({ topic }: TopicItemProps) => {
  return (
    <div>
      <div>{topic.title}</div>
      <div>{topic.description}</div>
    </div>
  );
};
