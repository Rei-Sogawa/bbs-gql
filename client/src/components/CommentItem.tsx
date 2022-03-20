import { gql } from "@apollo/client";

import { CommentItemFragment } from "../graphql/generated";
import { Time } from "./Time";
import { UserName } from "./UserName";

gql`
  fragment CommentItem on Comment {
    id
    content
    createdAt
    user {
      id
      displayName
    }
  }
`;

type CommentItemProps = {
  comment: CommentItemFragment;
};

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div>
      <div className="flex items-baseline space-x-4">
        <UserName userName={comment.user.displayName} />
        <Time time={comment.createdAt} />
      </div>

      <div>{comment.content}</div>
    </div>
  );
};
