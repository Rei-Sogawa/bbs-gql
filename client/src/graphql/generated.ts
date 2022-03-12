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
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: User;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  totalPhotos: Scalars['Int'];
};

export type SignUpInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type FetchTotalPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchTotalPhotosQuery = { __typename?: 'Query', totalPhotos: number };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, displayName: string } };


export const FetchTotalPhotosDocument = gql`
    query fetchTotalPhotos {
  totalPhotos
}
    `;

/**
 * __useFetchTotalPhotosQuery__
 *
 * To run a query within a React component, call `useFetchTotalPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTotalPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTotalPhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchTotalPhotosQuery(baseOptions?: Apollo.QueryHookOptions<FetchTotalPhotosQuery, FetchTotalPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchTotalPhotosQuery, FetchTotalPhotosQueryVariables>(FetchTotalPhotosDocument, options);
      }
export function useFetchTotalPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchTotalPhotosQuery, FetchTotalPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchTotalPhotosQuery, FetchTotalPhotosQueryVariables>(FetchTotalPhotosDocument, options);
        }
export type FetchTotalPhotosQueryHookResult = ReturnType<typeof useFetchTotalPhotosQuery>;
export type FetchTotalPhotosLazyQueryHookResult = ReturnType<typeof useFetchTotalPhotosLazyQuery>;
export type FetchTotalPhotosQueryResult = Apollo.QueryResult<FetchTotalPhotosQuery, FetchTotalPhotosQueryVariables>;
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