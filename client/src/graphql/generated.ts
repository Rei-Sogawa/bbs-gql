import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type Comment = {
  __typename?: 'Comment';
  comments: CommentConnection;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  parent: CommentParent;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges: Array<CommentEdge>;
  pageInfo: PageInfo;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['DateTime'];
  node: Comment;
};

export type CommentParent = Comment | Topic;

export const CommentParentName = {
  Comment: 'comment',
  Topic: 'topic'
} as const;

export type CommentParentName = typeof CommentParentName[keyof typeof CommentParentName];
export type CreateCommentInput = {
  content: Scalars['String'];
  parentId: Scalars['String'];
  parentName: CommentParentName;
};

export type CreateTopicInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentEdge;
  createTopic: Topic;
  deleteComment: CommentEdge;
  deleteTopic: Topic;
  signUp: User;
  updateComment: Comment;
  updateTopic: Topic;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTopicArgs = {
  id: Scalars['ID'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateCommentArgs = {
  id: Scalars['ID'];
  input: UpdateCommentInput;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID'];
  input: UpdateTopicInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['DateTime']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['DateTime']>;
};

export type PaginateInput = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  topic: Topic;
  topics: TopicConnection;
};


export type QueryTopicArgs = {
  id: Scalars['ID'];
};


export type QueryTopicsArgs = {
  input: PaginateInput;
};

export type SignUpInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Topic = {
  __typename?: 'Topic';
  comments: CommentConnection;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};


export type TopicCommentsArgs = {
  input: PaginateInput;
};

export type TopicConnection = {
  __typename?: 'TopicConnection';
  edges: Array<TopicEdge>;
  pageInfo: PageInfo;
};

export type TopicEdge = {
  __typename?: 'TopicEdge';
  cursor: Scalars['DateTime'];
  node: Topic;
};

export type UpdateCommentInput = {
  content: Scalars['String'];
};

export type UpdateTopicInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  id: Scalars['ID'];
  topics: Array<Topic>;
};

export type ChildCommentItemFragment = { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } };

export type RootCommentItemFragment = { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string }, comments: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } }> } };

export type TopicItemFragment = { __typename?: 'Topic', id: string, title: string, createdAt: string };

export type UserForMeFragment = { __typename?: 'User', id: string, displayName: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, displayName: string } };

export type RootCommentConnectionFragment = { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', cursor: string, node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string }, comments: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } }> } } }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } };

export type RootCommentsForTopicQueryVariables = Exact<{
  topicId: Scalars['ID'];
  paginateInput: PaginateInput;
}>;


export type RootCommentsForTopicQuery = { __typename?: 'Query', topic: { __typename?: 'Topic', id: string, comments: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', cursor: string, node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string }, comments: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } }> } } }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type CreateRootCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateRootCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentEdge', cursor: string, node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string }, comments: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } }> } } } };

export type UpdateRootCommentMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateCommentInput;
}>;


export type UpdateRootCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string }, comments: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } }> } } };

export type DeleteRootCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRootCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'CommentEdge', cursor: string, node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string }, comments: { __typename?: 'CommentConnection', edges: Array<{ __typename?: 'CommentEdge', node: { __typename?: 'Comment', id: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } }> } } } };

export type TopicsForIndexQueryVariables = Exact<{
  input: PaginateInput;
}>;


export type TopicsForIndexQuery = { __typename?: 'Query', topics: { __typename?: 'TopicConnection', edges: Array<{ __typename?: 'TopicEdge', cursor: string, node: { __typename?: 'Topic', id: string, title: string, createdAt: string } }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type TopicForTopicQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TopicForTopicQuery = { __typename?: 'Query', topic: { __typename?: 'Topic', id: string, title: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } };

export type TopicForTopicEditQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TopicForTopicEditQuery = { __typename?: 'Query', topic: { __typename?: 'Topic', id: string, title: string, content: string, user: { __typename?: 'User', id: string } } };

export type CreateTopicMutationVariables = Exact<{
  input: CreateTopicInput;
}>;


export type CreateTopicMutation = { __typename?: 'Mutation', createTopic: { __typename?: 'Topic', id: string, title: string, createdAt: string } };

export type UpdateTopicMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateTopicInput;
}>;


export type UpdateTopicMutation = { __typename?: 'Mutation', updateTopic: { __typename?: 'Topic', id: string, title: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } } };

export type DeleteTopicMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTopicMutation = { __typename?: 'Mutation', deleteTopic: { __typename?: 'Topic', id: string, title: string, createdAt: string } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, displayName: string } };

export type TopicForTopicEditFragment = { __typename?: 'Topic', id: string, title: string, content: string, user: { __typename?: 'User', id: string } };

export type TopicForTopicDetailFragment = { __typename?: 'Topic', id: string, title: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, displayName: string } };

export const TopicItemFragmentDoc = gql`
    fragment TopicItem on Topic {
  id
  title
  createdAt
}
    `;
export const UserForMeFragmentDoc = gql`
    fragment UserForMe on User {
  id
  displayName
}
    `;
export const ChildCommentItemFragmentDoc = gql`
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
export const RootCommentItemFragmentDoc = gql`
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
}
    ${ChildCommentItemFragmentDoc}`;
export const RootCommentConnectionFragmentDoc = gql`
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
    ${RootCommentItemFragmentDoc}`;
export const TopicForTopicEditFragmentDoc = gql`
    fragment TopicForTopicEdit on Topic {
  id
  title
  content
  user {
    id
  }
}
    `;
export const TopicForTopicDetailFragmentDoc = gql`
    fragment TopicForTopicDetail on Topic {
  id
  title
  content
  createdAt
  user {
    id
    displayName
  }
}
    `;
export const MeDocument = gql`
    query me {
  me {
    id
    ...UserForMe
  }
}
    ${UserForMeFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RootCommentsForTopicDocument = gql`
    query RootCommentsForTopic($topicId: ID!, $paginateInput: PaginateInput!) {
  topic(id: $topicId) {
    id
    comments(input: $paginateInput) {
      ...RootCommentConnection
    }
  }
}
    ${RootCommentConnectionFragmentDoc}`;

/**
 * __useRootCommentsForTopicQuery__
 *
 * To run a query within a React component, call `useRootCommentsForTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useRootCommentsForTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRootCommentsForTopicQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useRootCommentsForTopicQuery(baseOptions: Apollo.QueryHookOptions<RootCommentsForTopicQuery, RootCommentsForTopicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RootCommentsForTopicQuery, RootCommentsForTopicQueryVariables>(RootCommentsForTopicDocument, options);
      }
export function useRootCommentsForTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RootCommentsForTopicQuery, RootCommentsForTopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RootCommentsForTopicQuery, RootCommentsForTopicQueryVariables>(RootCommentsForTopicDocument, options);
        }
export type RootCommentsForTopicQueryHookResult = ReturnType<typeof useRootCommentsForTopicQuery>;
export type RootCommentsForTopicLazyQueryHookResult = ReturnType<typeof useRootCommentsForTopicLazyQuery>;
export type RootCommentsForTopicQueryResult = Apollo.QueryResult<RootCommentsForTopicQuery, RootCommentsForTopicQueryVariables>;
export const CreateRootCommentDocument = gql`
    mutation CreateRootComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    node {
      id
      ...RootCommentItem
    }
    cursor
  }
}
    ${RootCommentItemFragmentDoc}`;
export type CreateRootCommentMutationFn = Apollo.MutationFunction<CreateRootCommentMutation, CreateRootCommentMutationVariables>;

/**
 * __useCreateRootCommentMutation__
 *
 * To run a mutation, you first call `useCreateRootCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRootCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRootCommentMutation, { data, loading, error }] = useCreateRootCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRootCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateRootCommentMutation, CreateRootCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRootCommentMutation, CreateRootCommentMutationVariables>(CreateRootCommentDocument, options);
      }
export type CreateRootCommentMutationHookResult = ReturnType<typeof useCreateRootCommentMutation>;
export type CreateRootCommentMutationResult = Apollo.MutationResult<CreateRootCommentMutation>;
export type CreateRootCommentMutationOptions = Apollo.BaseMutationOptions<CreateRootCommentMutation, CreateRootCommentMutationVariables>;
export const UpdateRootCommentDocument = gql`
    mutation UpdateRootComment($id: ID!, $input: UpdateCommentInput!) {
  updateComment(id: $id, input: $input) {
    id
    ...RootCommentItem
  }
}
    ${RootCommentItemFragmentDoc}`;
export type UpdateRootCommentMutationFn = Apollo.MutationFunction<UpdateRootCommentMutation, UpdateRootCommentMutationVariables>;

/**
 * __useUpdateRootCommentMutation__
 *
 * To run a mutation, you first call `useUpdateRootCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRootCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRootCommentMutation, { data, loading, error }] = useUpdateRootCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRootCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRootCommentMutation, UpdateRootCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRootCommentMutation, UpdateRootCommentMutationVariables>(UpdateRootCommentDocument, options);
      }
export type UpdateRootCommentMutationHookResult = ReturnType<typeof useUpdateRootCommentMutation>;
export type UpdateRootCommentMutationResult = Apollo.MutationResult<UpdateRootCommentMutation>;
export type UpdateRootCommentMutationOptions = Apollo.BaseMutationOptions<UpdateRootCommentMutation, UpdateRootCommentMutationVariables>;
export const DeleteRootCommentDocument = gql`
    mutation DeleteRootComment($id: ID!) {
  deleteComment(id: $id) {
    node {
      id
      ...RootCommentItem
    }
    cursor
  }
}
    ${RootCommentItemFragmentDoc}`;
export type DeleteRootCommentMutationFn = Apollo.MutationFunction<DeleteRootCommentMutation, DeleteRootCommentMutationVariables>;

/**
 * __useDeleteRootCommentMutation__
 *
 * To run a mutation, you first call `useDeleteRootCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRootCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRootCommentMutation, { data, loading, error }] = useDeleteRootCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRootCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRootCommentMutation, DeleteRootCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRootCommentMutation, DeleteRootCommentMutationVariables>(DeleteRootCommentDocument, options);
      }
export type DeleteRootCommentMutationHookResult = ReturnType<typeof useDeleteRootCommentMutation>;
export type DeleteRootCommentMutationResult = Apollo.MutationResult<DeleteRootCommentMutation>;
export type DeleteRootCommentMutationOptions = Apollo.BaseMutationOptions<DeleteRootCommentMutation, DeleteRootCommentMutationVariables>;
export const TopicsForIndexDocument = gql`
    query TopicsForIndex($input: PaginateInput!) {
  topics(input: $input) {
    edges {
      node {
        id
        ...TopicItem
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
}
    ${TopicItemFragmentDoc}`;

/**
 * __useTopicsForIndexQuery__
 *
 * To run a query within a React component, call `useTopicsForIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsForIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsForIndexQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTopicsForIndexQuery(baseOptions: Apollo.QueryHookOptions<TopicsForIndexQuery, TopicsForIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicsForIndexQuery, TopicsForIndexQueryVariables>(TopicsForIndexDocument, options);
      }
export function useTopicsForIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicsForIndexQuery, TopicsForIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicsForIndexQuery, TopicsForIndexQueryVariables>(TopicsForIndexDocument, options);
        }
export type TopicsForIndexQueryHookResult = ReturnType<typeof useTopicsForIndexQuery>;
export type TopicsForIndexLazyQueryHookResult = ReturnType<typeof useTopicsForIndexLazyQuery>;
export type TopicsForIndexQueryResult = Apollo.QueryResult<TopicsForIndexQuery, TopicsForIndexQueryVariables>;
export const TopicForTopicDocument = gql`
    query TopicForTopic($id: ID!) {
  topic(id: $id) {
    id
    ...TopicForTopicDetail
  }
}
    ${TopicForTopicDetailFragmentDoc}`;

/**
 * __useTopicForTopicQuery__
 *
 * To run a query within a React component, call `useTopicForTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicForTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicForTopicQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTopicForTopicQuery(baseOptions: Apollo.QueryHookOptions<TopicForTopicQuery, TopicForTopicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicForTopicQuery, TopicForTopicQueryVariables>(TopicForTopicDocument, options);
      }
export function useTopicForTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicForTopicQuery, TopicForTopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicForTopicQuery, TopicForTopicQueryVariables>(TopicForTopicDocument, options);
        }
export type TopicForTopicQueryHookResult = ReturnType<typeof useTopicForTopicQuery>;
export type TopicForTopicLazyQueryHookResult = ReturnType<typeof useTopicForTopicLazyQuery>;
export type TopicForTopicQueryResult = Apollo.QueryResult<TopicForTopicQuery, TopicForTopicQueryVariables>;
export const TopicForTopicEditDocument = gql`
    query TopicForTopicEdit($id: ID!) {
  topic(id: $id) {
    id
    ...TopicForTopicEdit
  }
}
    ${TopicForTopicEditFragmentDoc}`;

/**
 * __useTopicForTopicEditQuery__
 *
 * To run a query within a React component, call `useTopicForTopicEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicForTopicEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicForTopicEditQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTopicForTopicEditQuery(baseOptions: Apollo.QueryHookOptions<TopicForTopicEditQuery, TopicForTopicEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicForTopicEditQuery, TopicForTopicEditQueryVariables>(TopicForTopicEditDocument, options);
      }
export function useTopicForTopicEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicForTopicEditQuery, TopicForTopicEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicForTopicEditQuery, TopicForTopicEditQueryVariables>(TopicForTopicEditDocument, options);
        }
export type TopicForTopicEditQueryHookResult = ReturnType<typeof useTopicForTopicEditQuery>;
export type TopicForTopicEditLazyQueryHookResult = ReturnType<typeof useTopicForTopicEditLazyQuery>;
export type TopicForTopicEditQueryResult = Apollo.QueryResult<TopicForTopicEditQuery, TopicForTopicEditQueryVariables>;
export const CreateTopicDocument = gql`
    mutation CreateTopic($input: CreateTopicInput!) {
  createTopic(input: $input) {
    id
    ...TopicItem
  }
}
    ${TopicItemFragmentDoc}`;
export type CreateTopicMutationFn = Apollo.MutationFunction<CreateTopicMutation, CreateTopicMutationVariables>;

/**
 * __useCreateTopicMutation__
 *
 * To run a mutation, you first call `useCreateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicMutation, { data, loading, error }] = useCreateTopicMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTopicMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicMutation, CreateTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTopicMutation, CreateTopicMutationVariables>(CreateTopicDocument, options);
      }
export type CreateTopicMutationHookResult = ReturnType<typeof useCreateTopicMutation>;
export type CreateTopicMutationResult = Apollo.MutationResult<CreateTopicMutation>;
export type CreateTopicMutationOptions = Apollo.BaseMutationOptions<CreateTopicMutation, CreateTopicMutationVariables>;
export const UpdateTopicDocument = gql`
    mutation UpdateTopic($id: ID!, $input: UpdateTopicInput!) {
  updateTopic(id: $id, input: $input) {
    id
    ...TopicForTopicDetail
  }
}
    ${TopicForTopicDetailFragmentDoc}`;
export type UpdateTopicMutationFn = Apollo.MutationFunction<UpdateTopicMutation, UpdateTopicMutationVariables>;

/**
 * __useUpdateTopicMutation__
 *
 * To run a mutation, you first call `useUpdateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicMutation, { data, loading, error }] = useUpdateTopicMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTopicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicMutation, UpdateTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicMutation, UpdateTopicMutationVariables>(UpdateTopicDocument, options);
      }
export type UpdateTopicMutationHookResult = ReturnType<typeof useUpdateTopicMutation>;
export type UpdateTopicMutationResult = Apollo.MutationResult<UpdateTopicMutation>;
export type UpdateTopicMutationOptions = Apollo.BaseMutationOptions<UpdateTopicMutation, UpdateTopicMutationVariables>;
export const DeleteTopicDocument = gql`
    mutation DeleteTopic($id: ID!) {
  deleteTopic(id: $id) {
    id
    ...TopicItem
  }
}
    ${TopicItemFragmentDoc}`;
export type DeleteTopicMutationFn = Apollo.MutationFunction<DeleteTopicMutation, DeleteTopicMutationVariables>;

/**
 * __useDeleteTopicMutation__
 *
 * To run a mutation, you first call `useDeleteTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTopicMutation, { data, loading, error }] = useDeleteTopicMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTopicMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTopicMutation, DeleteTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(DeleteTopicDocument, options);
      }
export type DeleteTopicMutationHookResult = ReturnType<typeof useDeleteTopicMutation>;
export type DeleteTopicMutationResult = Apollo.MutationResult<DeleteTopicMutation>;
export type DeleteTopicMutationOptions = Apollo.BaseMutationOptions<DeleteTopicMutation, DeleteTopicMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpInput!) {
  signUp(input: $input) {
    id
    displayName
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;