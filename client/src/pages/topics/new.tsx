import { VFC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Layout } from "../../components/layout/Layout";
import { Container } from "../../components/shared/Container";
import { Heading } from "../../components/shared/Heading";
import { TopicForm, TopicFormProps } from "../../components/topic/TopicForm";
import { useCreateTopic } from "../../hooks/useTopics";
import { routes } from "../../routes";

export const TopicNew: VFC = () => {
  const navigate = useNavigate();

  const initialValues: TopicFormProps["initialValues"] = { title: "", content: "" };

  const createTopic = useCreateTopic();
  const onSubmit: TopicFormProps["onSubmit"] = async (v) => {
    const { data } = await createTopic({ variables: { input: v } });
    if (!data) return;
    navigate(routes["/topics/:topicId"].path({ topicId: data.createTopic.id }));
  };

  return (
    <Layout>
      <Container size="md">
        <div className="text-center">
          <Heading>Topic New Page!</Heading>
        </div>
        <TopicForm initialValues={initialValues} onSubmit={onSubmit} />
        <div className="mt-2 ml-2">
          <Link className="link link-primary" to={routes["/"].path()}>
            Back
          </Link>
        </div>
      </Container>
    </Layout>
  );
};
