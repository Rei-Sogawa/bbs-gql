import { VFC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AppContainer } from "../../components/AppContainer";
import { AppHeading } from "../../components/AppHeading";
import { AppLayout } from "../../components/AppLayout";
import { TopicForm, TopicFormProps } from "../../components/TopicForm";
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
    <AppLayout>
      <AppContainer size="md">
        <div className="text-center">
          <AppHeading>Topic New Page!</AppHeading>
        </div>
        <TopicForm initialValues={initialValues} onSubmit={onSubmit} />
        <div className="mt-2 ml-2">
          <Link className="link link-primary" to={routes["/"].path()}>
            Back
          </Link>
        </div>
      </AppContainer>
    </AppLayout>
  );
};
