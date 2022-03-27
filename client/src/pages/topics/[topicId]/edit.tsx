import { gql } from "@apollo/client";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { Layout } from "../../../components/layout/Layout";
import { Container } from "../../../components/shared/Container";
import { Heading } from "../../../components/shared/Heading";
import { TopicForm, TopicFormProps } from "../../../components/topic/TopicForm";
import { useAuth } from "../../../contexts/Auth";
import { TopicForTopicEditFragment } from "../../../graphql/generated";
import { useTopicEdit, useUpdateTopic } from "../../../hooks/useTopics";
import { routes } from "../../../routes";

gql`
  fragment TopicForTopicEdit on Topic {
    id
    title
    content
    user {
      id
    }
  }
`;

type TopicEditViewProps = { topic: TopicForTopicEditFragment };

export const TopicEditView = ({ topic }: TopicEditViewProps) => {
  const navigate = useNavigate();

  const initialValues: TopicFormProps["initialValues"] = { title: topic.title, content: topic.content };

  const updateTopic = useUpdateTopic();
  const onSubmit: TopicFormProps["onSubmit"] = async (v) => {
    const { data } = await updateTopic({ variables: { id: topic.id, input: v } });
    if (!data) return;
    navigate(routes["/topics/:topicId"].path({ topicId: data.updateTopic.id }));
  };

  return (
    <Layout>
      <Container size="md">
        <div className="text-center">
          <Heading>Topic Edit Page!</Heading>
        </div>
        <TopicForm initialValues={initialValues} onSubmit={onSubmit} />
        <div className="mt-2 ml-2">
          <Link className="link link-primary" to={routes["/topics/:topicId"].path({ topicId: topic.id })}>
            Back
          </Link>
        </div>
      </Container>
    </Layout>
  );
};

export const TopicEdit = () => {
  const { topicId } = useParams();

  const { uid } = useAuth();
  const topic = useTopicEdit(topicId!);

  if (!topic) return null;
  if (uid !== topic.user.id) return <Navigate to={routes["/"].path()} />;
  return <TopicEditView topic={topic} />;
};
