import { gql } from "@apollo/client";

import { useAuth } from "../contexts/Auth";
import { CommentItemFragment } from "../graphql/generated";
import { AppEllipsisMenu } from "./AppEllipsisMenu";
import { Content } from "./Content";
import { Time } from "./Time";
import { UserName } from "./UserName";

const CommentItemMenu = () => {
  return (
    <AppEllipsisMenu>
      <li>
        <button className="btn btn-ghost">Delete</button>
      </li>
    </AppEllipsisMenu>
  );
};

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
  const { uid } = useAuth();
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex items-baseline space-x-4">
          <UserName userName={comment.user.displayName} />
          <Time time={comment.createdAt} />
        </div>
        {comment.user.id === uid && <CommentItemMenu />}
      </div>

      <Content content={comment.content} />
    </div>
  );
};
