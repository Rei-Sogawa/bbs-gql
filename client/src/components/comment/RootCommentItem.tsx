import { gql } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { useAuth } from "../../contexts/Auth";
import { RootCommentItemFragment } from "../../graphql/generated";
import { useCreateChildComment, useDeleteRootComment, useUpdateRootComment } from "../../hooks/useComments";
import { Content } from "../shared/Content";
import { Time } from "../shared/Time";
import { UserName } from "../shared/UserName";
import { ChildCommentItem } from "./ChildCommentItem";
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
    comments {
      edges {
        node {
          id
          ...ChildCommentItem
        }
      }
    }
    parent {
      __typename
      ... on Topic {
        id
      }
      ... on Comment {
        id
      }
    }
  }
`;

type RootCommentItemProps = { comment: RootCommentItemFragment };

export const RootCommentItem = ({ comment }: RootCommentItemProps) => {
  const { uid } = useAuth();

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const createChildComment = useCreateChildComment({ parent: comment });
  const initialValues: CommentFormProps["initialValues"] = {
    content: "",
  };
  const onSubmit: CommentFormProps["onSubmit"] = async (values) => {
    await createChildComment(values);
  };

  const updateComment = useUpdateRootComment(comment);
  const onSubmitEditComment = async ({ content }: FormValues) => {
    await updateComment({ content });
    setIsEditing(false);
  };

  const deleteRootComment = useDeleteRootComment(comment);

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
                  <CommentItemMenu onEdit={() => setIsEditing(true)} onDelete={deleteRootComment} />
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
                {comment.comments.edges.length > 0 && (
                  <div className="px-2 rounded-md bg-gray-200 font-bold text-xs">{comment.comments.edges.length}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {isReplying && (
        <div>
          <div className="flex">
            <div className="divider divider-horizontal" />
            <div className="flex-1 flex flex-col space-y-2">
              {comment.comments.edges.map(({ node: comment }) => (
                <ChildCommentItem key={comment.id} comment={comment} />
              ))}
              {uid ? <CommentForm {...{ initialValues, onSubmit }} /> : <CommentFormBeforeLogIn />}
            </div>
          </div>
          <div className="h-2" />
        </div>
      )}
    </div>
  );
};
