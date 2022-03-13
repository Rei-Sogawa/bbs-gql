import { gql } from "@apollo/client";
import { VFC } from "react";

import { AppContainer } from "../../components/AppContainer";
import { AppHeader } from "../../components/AppHeader";
import { AppLayout } from "../../components/AppLayout";
import { TopicForm, TopicFormProps } from "../../components/TopicForm";
import { useCreateTopicMutation } from "../../graphql/generated";

gql`
  mutation createTopic($input: CreateTopicInput!) {
    createTopic(input: $input) {
      id
      ...TopicItem
    }
  }
`;

export const TopicNew: VFC = () => {
  const initialValues: TopicFormProps["initialValues"] = { title: "", description: "" };

  const [createTopic] = useCreateTopicMutation();
  const onSubmit: TopicFormProps["onSubmit"] = async (v) => {
    const res = await createTopic({ variables: { input: v } });
  };

  return (
    <AppLayout>
      <AppContainer size="md">
        <div className="text-center">
          <AppHeader>Topic New Page!</AppHeader>
        </div>
        <TopicForm initialValues={initialValues} onSubmit={onSubmit} />
      </AppContainer>
    </AppLayout>
  );
};
