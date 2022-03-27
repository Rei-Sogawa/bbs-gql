import { gql } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { useAuth } from "../../contexts/Auth";
import { ChildCommentItemFragment } from "../../graphql/generated";
import { useUpdateRootComment } from "../../hooks/useRootComments";
import { Content } from "../shared/Content";
import { Time } from "../shared/Time";
import { UserName } from "../shared/UserName";
import { CommentForm, FormValues } from "./CommentForm";
import { CommentItemMenu } from "./CommentItemMenu";

gql`
  fragment ChildCommentItem on Comment {
    id
    content
    createdAt
    user {
      id
      displayName
    }
  }
`;

type ChildCommentItemProps = { comment: ChildCommentItemFragment };

export const ChildCommentItem = ({ comment }: ChildCommentItemProps) => {
  const { uid } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const updateComment = useUpdateRootComment();
  const onSubmitEditComment = async ({ content }: FormValues) => {
    await updateComment({ variables: { id: comment.id, input: { content } } });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
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
                {comment.user.id === uid && (
                  <CommentItemMenu onEdit={() => setIsEditing(true)} onDelete={() => Promise.resolve()} />
                )}
              </div>

              <Content content={comment.content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
