import { gql } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { useAuth } from "../../contexts/Auth";
import { RootCommentItemFragment } from "../../graphql/generated";
import { useUpdateRootComment } from "../../hooks/useRootComments";
import { Content } from "../Content";
import { Time } from "../Time";
import { UserName } from "../UserName";
import { CommentForm, CommentFormProps, FormValues } from "./CommentForm";
import { CommentFormBeforeLogIn } from "./CommentFormBeforeLogin";
import { CommentItemMenu } from "./CommentItemMenu";

gql`
  fragment RootCommentItem on Comment {
    id
    content
    createdAt
    user {
      id
      displayName
    }
  }
`;

type RootCommentItemProps = { comment: RootCommentItemFragment };

export const RootCommentItem = ({ comment }: RootCommentItemProps) => {
  const { uid } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const updateComment = useUpdateRootComment();
  const onSubmitEditComment = async ({ content }: FormValues) => {
    await updateComment({ variables: { id: comment.id, input: { content } } });
    setIsEditing(false);
  };

  const initialValues: CommentFormProps["initialValues"] = {
    content: "",
  };
  const onSubmit: CommentFormProps["onSubmit"] = (v) => {
    return Promise.resolve();
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
                {comment.user.id === uid && (
                  <CommentItemMenu onEdit={() => setIsEditing(true)} onDelete={() => Promise.resolve()} />
                )}
              </div>

              <Content content={comment.content} />

              <div className="flex space-x-2 items-baseline">
                <button
                  className="link"
                  onClick={() => {
                    setIsReplying((prev) => !prev);
                  }}
                >
                  reply
                </button>
                <div className="px-2 rounded-md bg-gray-200 font-bold text-xs">{1}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex">
          <div className="divider divider-horizontal" />
          <div className="flex-1 flex flex-col space-y-2">
            {/* {comment.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))} */}
            {isReplying && (uid ? <CommentForm {...{ initialValues, onSubmit }} /> : <CommentFormBeforeLogIn />)}
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
};
