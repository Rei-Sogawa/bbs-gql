import { gql } from "@apollo/client";

import { useCreateCommentMutation, useDeleteCommentMutation } from "../graphql/generated";

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
    }
  }
`;

export const useCreateComment = () => {
  const [createComment] = useCreateCommentMutation();
  return createComment;
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
