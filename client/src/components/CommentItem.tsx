import { gql } from "@apollo/client";
import { useState } from "react";

import { useAuth } from "../contexts/Auth";
import { Comment, CommentItemFragment } from "../graphql/generated";
import { useDeleteComment, useUpdateComment } from "../hooks/useComments";
import { AppEllipsisMenu } from "./AppEllipsisMenu";
import { CommentForm, FormValues } from "./CommentForm";
import { Content } from "./Content";
import { Time } from "./Time";
import { UserName } from "./UserName";

const CommentItemMenu = ({ comment, onEdit }: { comment: Pick<Comment, "id">; onEdit: () => void }) => {
  const deleteComment = useDeleteComment();

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

  const updateComment = useUpdateComment();

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async ({ content }: FormValues) => {
    await updateComment({ variables: { id: comment.id, input: { content } } });
    setIsEditing(false);
  };

  return (
    <div className="px-3 py-4 border rounded">
      {isEditing ? (
        <CommentForm initialValues={comment} onSubmit={onSubmit} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-baseline space-x-4">
              <UserName userName={comment.user.displayName} />
              <Time time={comment.createdAt} />
            </div>
            {comment.user.id === uid && <CommentItemMenu comment={comment} onEdit={() => setIsEditing(true)} />}
          </div>

          <Content content={comment.content} />
        </div>
      )}
    </div>
  );
};
