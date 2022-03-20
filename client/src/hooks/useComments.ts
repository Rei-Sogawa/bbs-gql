import { gql } from "@apollo/client";

import { useCreateCommentMutation } from "../graphql/generated";

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
