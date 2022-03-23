import { gql } from "@apollo/client";

import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "../graphql/generated";

gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      __typename
      ... on Topic {
        id
        comments {
          id
          ...CommentItem
        }
      }
      ... on Comment {
        id
        comments {
          id
          ..._CommentItem
        }
      }
    }
  }
`;

export const useCreateComment = () => {
  const [createComment] = useCreateCommentMutation();
  return createComment;
};

gql`
  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      id
      ...CommentItem
    }
  }
`;

export const useUpdateComment = () => {
  const [updateComment] = useUpdateCommentMutation();
  return updateComment;
};

gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      __typename
      ... on Topic {
        id
        comments {
          id
          ...CommentItem
        }
      }
    }
  }
`;

export const useDeleteComment = () => {
  const [deleteComment] = useDeleteCommentMutation();
  return deleteComment;
};
