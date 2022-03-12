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

export type Query = {
  __typename?: 'Query';
  totalPhotos: Scalars['Int'];
};

export type FetchTotalPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchTotalPhotosQuery = { __typename?: 'Query', totalPhotos: number };


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