import { gql, Reference } from "@apollo/client";
import { Merge } from "type-fest";

import {
  Comment,
  CommentEdge,
  useCreateRootCommentMutation,
  useDeleteRootCommentMutation,
  useRootCommentsForTopicQuery,
  useUpdateRootCommentMutation,
} from "../graphql/generated";

function assertParentTopic(
  parent: Pick<Comment["parent"], "id" | "__typename">
): asserts parent is { id: string; __typename: "Topic" } {
  if (parent.__typename !== "Topic") throw new Error("Parent is not Topic");
}

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
`;

gql`
  query RootCommentsForTopic($topicId: ID!, $paginateInput: PaginateInput!) {
    topic(id: $topicId) {
      id
      comments(input: $paginateInput) {
        ...RootCommentConnection
      }
    }
  }
`;

export const useRootComments = (topicId: string) => {
  const { data, fetchMore } = useRootCommentsForTopicQuery({
    variables: { topicId, paginateInput: { first: 10 } },
  });

  const edges = data?.topic.comments.edges;
  const pageInfo = data?.topic.comments.pageInfo;

  const fetchMoreRootComments = () => {
    fetchMore({ variables: { topicId, paginateInput: { first: 10, after: pageInfo?.endCursor } } });
  };

  return {
    rootCommentEdges: edges,
    rootCommentPageInfo: pageInfo,
    fetchMoreRootComments,
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

export const useCreateRootComment = (parent: Pick<Comment["parent"], "id" | "__typename">) => {
  assertParentTopic(parent);
  const [createComment] = useCreateRootCommentMutation({
    update(cache, { data }) {
      if (!data) return;
      cache.modify({
        id: cache.identify(parent),
        fields: {
          comments(existing, { toReference }) {
            if (!existing) return existing;

            const edge = { ...data.createComment, node: toReference(data.createComment.node) };
            if (existing.pageInfo.hasNextPage) {
              if (edge.cursor < existing.pageInfo.endCursor) {
                return { ...existing, edges: [...existing.edges, edge].sort((a, b) => a.cursor - b.cursor) };
              }
              return existing;
            }

            return { ...existing, edges: [...existing.edges, edge].sort((a, b) => a.cursor - b.cursor) };
          },
        },
      });
    },
  });
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

export const useDeleteRootComment = (parent: Pick<Comment["parent"], "id" | "__typename">) => {
  assertParentTopic(parent);
  const [deleteComment] = useDeleteRootCommentMutation({
    update(cache, { data }) {
      if (!data) return;
      cache.modify({
        id: cache.identify(parent),
        fields: {
          comments(existing, { readField }) {
            if (!existing) return existing;

            return {
              ...existing,
              edges: existing.edges.filter(
                (edge: Merge<CommentEdge, { node: Reference }>) =>
                  readField("id", edge.node) !== data.deleteComment.node.id
              ),
            };
          },
        },
      });
    },
  });
  return deleteComment;
};
