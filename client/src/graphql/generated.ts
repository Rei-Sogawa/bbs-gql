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
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  parent: TopicOrComment;
  root: Topic;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CreateCommentInput = {
  content: Scalars['String'];
  parentId: Scalars['String'];
  rootId: Scalars['String'];
};

export type CreateTopicInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createTopic: Topic;
  deleteTopic: Topic;
  signUp: User;
  updateTopic: Topic;
};


export type MutationCreateCommentArgs = {
  input?: InputMaybe<CreateCommentInput>;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};


export type MutationDeleteTopicArgs = {
  id: Scalars['ID'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID'];
  input: UpdateTopicInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  topic: Topic;
  topics: Array<Topic>;
};


export type QueryTopicArgs = {
  id: Scalars['ID'];
};

export type SignUpInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Topic = {
  __typename?: 'Topic';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type TopicOrComment = Comment | Topic;

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

export type TopicItemFragment = { __typename?: 'Topic', id: string, title: string, createdAt: string };

export type UserForMeFragment = { __typename?: 'User', id: string, displayName: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, displayName: string } };

export type TopicsForIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsForIndexQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', id: string, title: string, createdAt: string }> };

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
export const TopicsForIndexDocument = gql`
    query TopicsForIndex {
  topics {
    id
    ...TopicItem
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
 *   },
 * });
 */
export function useTopicsForIndexQuery(baseOptions?: Apollo.QueryHookOptions<TopicsForIndexQuery, TopicsForIndexQueryVariables>) {
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