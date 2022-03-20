import { gql } from "@apollo/client";

import { useAuth } from "../contexts/Auth";
import { Comment, CommentItemFragment } from "../graphql/generated";
import { useDeleteComment } from "../hooks/useComments";
import { AppEllipsisMenu } from "./AppEllipsisMenu";
import { Content } from "./Content";
import { Time } from "./Time";
import { UserName } from "./UserName";

const CommentItemMenu = ({ comment }: { comment: Pick<Comment, "id"> }) => {
  const deleteComment = useDeleteComment();

  const onEdit = () => {};

  const onDelete = async () => {
    await deleteComment({ variables: { id: comment.id } });
  };

  return (
    <AppEllipsisMenu>
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
        {comment.user.id === uid && <CommentItemMenu comment={comment} />}
      </div>

      <Content content={comment.content} />
    </div>
  );
};
