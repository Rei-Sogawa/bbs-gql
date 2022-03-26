// import { gql } from "@apollo/client";

// import {
//   useCreateCommentMutation,
//   useDeleteCommentMutation,
//   useParentCommentsForTopicQuery,
//   useUpdateCommentMutation,
// } from "../graphql/generated";
// import { PaginateInput } from "./../graphql/generated";

// gql`
//   fragment CommentConnection on CommentConnection {
//     edges {
//       node {
//         id
//         ...CommentItem
//       }
//       cursor
//     }
//     pageInfo {
//       startCursor
//       endCursor
//       hasNextPage
//       hasPreviousPage
//     }
//   }

//   query ParentCommentsForTopic($topicId: ID!, $paginateInput: PaginateInput!) {
//     topic(id: $topicId) {
//       id
//       comments(input: $paginateInput) {
//         ...CommentConnection
//       }
//     }
//   }
// `;

// export const useParentComments = (topicId: string, paginateInput: PaginateInput) => {
//   const { data } = useParentCommentsForTopicQuery({ variables: { topicId, paginateInput } });

//   const edges = data?.topic.comments.edges;
//   const pageInfo = data?.topic.comments.pageInfo;

//   return {
//     edges,
//     pageInfo,
//   };
// };

// gql`
//   mutation CreateComment($input: CreateCommentInput!, $paginateInput: PaginateInput!) {
//     createComment(input: $input) {
//       ... on Topic {
//         id
//         comments(input: $paginateInput) {
//           ...CommentConnection
//         }
//       }
//     }
//   }
// `;

// export const useCreateComment = () => {
//   const [createComment] = useCreateCommentMutation();
//   return createComment;
// };

// gql`
//   mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {
//     updateComment(id: $id, input: $input) {
//       id
//       ...CommentItem
//     }
//   }
// `;

// export const useUpdateComment = () => {
//   const [updateComment] = useUpdateCommentMutation();
//   return updateComment;
// };

// gql`
//   mutation DeleteComment($id: ID!, $paginateInput: PaginateInput!) {
//     deleteComment(id: $id) {
//       ... on Topic {
//         id
//         comments(input: $paginateInput) {
//           ...CommentConnection
//         }
//       }
//     }
//   }
// `;

// export const useDeleteComment = () => {
//   const [deleteComment] = useDeleteCommentMutation();
//   return deleteComment;
// };
