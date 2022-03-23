import { gql } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { useAuth } from "../contexts/Auth";
import { _CommentItemFragment, Comment, CommentItemFragment } from "../graphql/generated";
import { useDeleteComment, useUpdateComment } from "../hooks/useComments";
import { AppEllipsisMenu } from "./AppEllipsisMenu";
import { CommentCreateForm } from "./CommentCreateForm";
import { CommentForm, FormValues } from "./CommentForm";
import { Content } from "./Content";
import { Time } from "./Time";
import { UserName } from "./UserName";

function isCommentItem(comment: CommentItemFragment | _CommentItemFragment): comment is CommentItemFragment {
  return (comment as any).comments !== undefined;
}

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
    ..._CommentItem
    comments {
      id
      ..._CommentItem
    }
  }

  fragment _CommentItem on Comment {
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
  comment: CommentItemFragment | _CommentItemFragment;
};

export const CommentItem = ({ comment }: CommentItemProps) => {
  const { uid } = useAuth();

  const updateComment = useUpdateComment();

  const [isEditing, setIsEditing] = useState(false);

  const onSubmitEditComment = async ({ content }: FormValues) => {
    await updateComment({ variables: { id: comment.id, input: { content } } });
    setIsEditing(false);
  };

  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <div className="px-3 py-4 border rounded">
        {isEditing ? (
          <CommentForm initialValues={comment} onSubmit={onSubmitEditComment} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="flex space-x-4">
            <button className="btn btn-circle btn-sm">
              <FaUser size="16" />
            </button>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex items-baseline space-x-4">
                  <UserName userName={comment.user.displayName} />
                  <Time time={comment.createdAt} />
                </div>
                {comment.user.id === uid && <CommentItemMenu comment={comment} onEdit={() => setIsEditing(true)} />}
              </div>

              <Content content={comment.content} />

              {isCommentItem(comment) && (
                <button className="link" onClick={() => setIsReplying((prev) => !prev)}>
                  reply
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isCommentItem(comment) && (isReplying || comment.comments.length > 0) && (
        <div>
          <div className="flex">
            <div className="divider divider-horizontal" />
            <div className="flex-1 flex flex-col space-y-2">
              {isReplying && <CommentCreateForm {...{ parentName: "comment", parentId: comment.id }} />}

              {comment.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          </div>

          <div className="h-2" />
        </div>
      )}
    </div>
  );
};
