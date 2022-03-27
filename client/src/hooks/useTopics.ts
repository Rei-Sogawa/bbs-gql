import { gql } from "@apollo/client";
import { useState } from "react";

import {
  PaginateInput,
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useTopicForTopicEditQuery,
  useTopicForTopicQuery,
  useTopicsForIndexQuery,
  useUpdateTopicMutation,
} from "../graphql/generated";
import { assertIsDefined } from "../util/assert";

gql`
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
`;

export const useTopics = () => {
  const [localPageInfo, setLocalPageInfo] = useState<PaginateInput>({
    first: 10,
    after: undefined,
    last: undefined,
    before: undefined,
  });

  const { data } = useTopicsForIndexQuery({ variables: { input: localPageInfo } });

  const edges = data?.topics.edges;
  const pageInfo = data?.topics.pageInfo;

  const onFirst = () => {
    setLocalPageInfo({ first: 10 });
  };
  const onPrevious = () => {
    assertIsDefined(pageInfo);
    setLocalPageInfo({ last: 10, before: pageInfo.startCursor });
  };
  const onNext = () => {
    assertIsDefined(pageInfo);
    setLocalPageInfo({ first: 10, after: pageInfo.endCursor });
  };
  const onLast = () => {
    setLocalPageInfo({ last: 10 });
  };

  return {
    edges,
    pageInfo,
    onFirst,
    onPrevious,
    onNext,
    onLast,
  };
};

gql`
  query TopicForTopic($id: ID!) {
    topic(id: $id) {
      id
      ...TopicForTopicDetail
    }
  }
`;

export const useTopic = (topicId: string) => {
  const { data } = useTopicForTopicQuery({ variables: { id: topicId } });
  const topic = data?.topic;
  return topic;
};

gql`
  query TopicForTopicEdit($id: ID!) {
    topic(id: $id) {
      id
      ...TopicForTopicEdit
    }
  }
`;

export const useTopicEdit = (topicId: string) => {
  const { data } = useTopicForTopicEditQuery({ variables: { id: topicId } });
  const topic = data?.topic;
  return topic;
};

gql`
  mutation CreateTopic($input: CreateTopicInput!) {
    createTopic(input: $input) {
      id
      ...TopicItem
    }
  }
`;

export const useCreateTopic = () => {
  const [createTopic] = useCreateTopicMutation({
    refetchQueries: ["TopicsForIndex"],
  });
  return createTopic;
};

gql`
  mutation UpdateTopic($id: ID!, $input: UpdateTopicInput!) {
    updateTopic(id: $id, input: $input) {
      id
      ...TopicForTopicDetail
    }
  }
`;

export const useUpdateTopic = () => {
  const [updateTopic] = useUpdateTopicMutation();
  return updateTopic;
};

gql`
  mutation DeleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
      ...TopicItem
    }
  }
`;

export const useDeleteTopic = () => {
  const [deleteTopic] = useDeleteTopicMutation({ refetchQueries: ["TopicsForIndex"] });
  return deleteTopic;
};
