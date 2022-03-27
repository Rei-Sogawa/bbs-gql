import { gql, Reference } from "@apollo/client";
import { Merge } from "type-fest";

import {
  Comment,
  CommentEdge,
  CreateCommentInput,
  useCreateRootCommentMutation,
  useDeleteRootCommentMutation,
  useRootCommentsForTopicQuery,
  useUpdateRootCommentMutation,
} from "../graphql/generated";
import { UpdateCommentInput } from "./../graphql/generated";

type _Parent = { parent: Pick<Comment["parent"], "id" | "__typename"> };
type _Comment = Pick<Comment, "id"> & _Parent;

function assertIsParentTopic(
  parent: Pick<Comment["parent"], "id" | "__typename">
): asserts parent is { id: string; __typename: "Topic" } {
  if (parent.__typename !== "Topic") throw new Error("Parent is not Topic");
}
function assertIsParentComment(
  parent: Pick<Comment["parent"], "id" | "__typename">
): asserts parent is { id: string; __typename: "Topic" } {
  if (parent.__typename !== "Comment") throw new Error("Parent is not Comment");
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

export const useCreateRootComment = (comment: _Parent) => {
  assertIsParentTopic(comment.parent);
  const [mutate] = useCreateRootCommentMutation({
    update(cache, { data }) {
      if (!data) return;
      cache.modify({
        id: cache.identify(comment.parent),
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
  const createComment = async (input: Pick<CreateCommentInput, "content">) => {
    await mutate({ variables: { input: { ...input, parentName: "topic", parentId: comment.parent.id } } });
  };
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

export const useUpdateRootComment = (comment: Pick<Comment, "id">) => {
  const [mutate] = useUpdateRootCommentMutation();
  const updateComment = async (input: UpdateCommentInput) => {
    await mutate({ variables: { id: comment.id, input } });
  };
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

export const useDeleteRootComment = (comment: _Comment) => {
  assertIsParentTopic(comment.parent);
  const [mutate] = useDeleteRootCommentMutation({
    update(cache, { data }) {
      if (!data) return;
      cache.modify({
        id: cache.identify(comment.parent),
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
  const deleteComment = async () => {
    await mutate({ variables: { id: comment.id } });
  };
  return deleteComment;
};

// export const useCreateChildComment = () => {};
// export const useUpdateChildComment = () => {};
// export const useDeleteChildComment = () => {};
