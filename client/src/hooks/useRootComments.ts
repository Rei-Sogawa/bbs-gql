import { gql } from "@apollo/client";

import {
  useCreateRootCommentMutation,
  useDeleteRootCommentMutation,
  useRootCommentsForTopicQuery,
  useUpdateRootCommentMutation,
} from "../graphql/generated";
import { PaginateInput } from "../graphql/generated";

gql`
  fragment RootCommentConnection on CommentConnection {
    edges {
      node {
        id
        ...RootCommentItem
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }

  query RootCommentsForTopic($topicId: ID!, $paginateInput: PaginateInput!) {
    topic(id: $topicId) {
      id
      comments(input: $paginateInput) {
        ...RootCommentConnection
      }
    }
  }
`;

export const useRootComments = (topicId: string, paginateInput: PaginateInput) => {
  const { data, fetchMore } = useRootCommentsForTopicQuery({ variables: { topicId, paginateInput } });

  const edges = data?.topic.comments.edges;
  const pageInfo = data?.topic.comments.pageInfo;

  return {
    edges,
    pageInfo,
    fetchMore: () => fetchMore({ variables: { topicId, paginateInput } }),
  };
};

gql`
  mutation CreateRootComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      node {
        id
        ...RootCommentItem
      }
      cursor
    }
  }
`;

export const useCreateRootComment = () => {
  const [createComment] = useCreateRootCommentMutation();
  return createComment;
};

gql`
  mutation UpdateRootComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      id
      ...RootCommentItem
    }
  }
`;

export const useUpdateRootComment = () => {
  const [updateComment] = useUpdateRootCommentMutation();
  return updateComment;
};

gql`
  mutation DeleteRootComment($id: ID!) {
    deleteComment(id: $id) {
      node {
        id
        ...RootCommentItem
      }
      cursor
    }
  }
`;

export const useDeleteRootComment = () => {
  const [deleteComment] = useDeleteRootCommentMutation();
  return deleteComment;
};
