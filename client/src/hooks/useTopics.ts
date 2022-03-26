import { gql } from "@apollo/client";

import {
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useTopicForTopicEditQuery,
  useTopicForTopicQuery,
  useTopicsForIndexQuery,
  useUpdateTopicMutation,
} from "../graphql/generated";

gql`
  query TopicsForIndex($input: TopicsInput!) {
    topics(input: $input) {
      edges {
        node {
          id
          ...TopicItem
        }
      }
    }
  }
`;

export const useTopics = () => {
  const { data } = useTopicsForIndexQuery({ variables: { input: { first: 20 } } });
  const topics = data?.topics.edges.map((v) => v.node) ?? [];
  return topics;
};

gql`
  query TopicForTopic($id: ID!) {
    topic(id: $id) {
      id
      ...TopicForTopicDetail
      comments {
        id
        ...CommentItem
      }
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
