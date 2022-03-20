import { gql } from "@apollo/client";

import { CommentItemFragment } from "../graphql/generated";

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
      <div>
        <div>{comment.user.displayName}</div>
        <div>{comment.createdAt}</div>
      </div>

      <div>{comment.content}</div>
    </div>
  );
};
