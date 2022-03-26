import { gql } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { useAuth } from "../contexts/Auth";
import { Comment, CommentItemFragment } from "../graphql/generated";
import { useDeleteComment, useUpdateComment } from "../hooks/useComments";
import { AppEllipsisMenu } from "./AppEllipsisMenu";
import { CommentCreateForm, CommentCreateFormBeforeLogIn } from "./CommentCreateForm";
import { CommentForm, FormValues } from "./CommentForm";
import { Content } from "./Content";
import { Time } from "./Time";
import { UserName } from "./UserName";

// function canComment(comment: CommentItemFragment | _CommentItemFragment): comment is CommentItemFragment {
//   return (comment as Record<string, unknown>).comments !== undefined;
// }

const CommentItemMenu = ({ comment, onEdit }: { comment: Pick<Comment, "id">; onEdit: () => void }) => {
  const deleteComment = useDeleteComment();

  const onDelete = async () => {
    await deleteComment({ variables: { id: comment.id, paginateInput: { first: 10 } } });
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

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const updateComment = useUpdateComment();
  const onSubmitEditComment = async ({ content }: FormValues) => {
    await updateComment({ variables: { id: comment.id, input: { content } } });
    setIsEditing(false);
  };

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

              {/* {canComment(comment) && (
                <div className="flex space-x-2 items-baseline">
                  <button
                    className="link"
                    onClick={() => {
                      setIsReplying((prev) => !prev);
                    }}
                  >
                    reply
                  </button>
                  <div className="px-2 rounded-md bg-gray-200 font-bold text-xs">{comment.comments.length}</div>
                </div>
              )} */}
            </div>
          </div>
        )}
      </div>

      {/* {canComment(comment) && isReplying && (
        <div>
          <div className="flex">
            <div className="divider divider-horizontal" />
            <div className="flex-1 flex flex-col space-y-2">
              {comment.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
              {isReplying && uid ? (
                <CommentCreateForm parentName="comment" parentId={comment.id} />
              ) : (
                <CommentCreateFormBeforeLogIn />
              )}
            </div>
          </div>

          <div className="h-2" />
        </div>
      )} */}
    </div>
  );
};
