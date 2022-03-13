import { gql } from "@apollo/client";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { AppContainer } from "../../../components/AppContainer";
import { AppHeading } from "../../../components/AppHeading";
import { AppLayout } from "../../../components/AppLayout";
import { TopicForm, TopicFormProps } from "../../../components/TopicForm";
import { useAuth } from "../../../contexts/Auth";
import { TopicForTopicEditFragment } from "../../../graphql/generated";
import { useTopicEdit, useUpdateTopic } from "../../../hooks/useTopics";
import { routes } from "../../../routes";

gql`
  fragment TopicForTopicEdit on Topic {
    id
    title
    description
    user {
      id
    }
  }
`;

type TopicEditViewProps = { topic: TopicForTopicEditFragment };

export const TopicEditView = ({ topic }: TopicEditViewProps) => {
  const navigate = useNavigate();

  const initialValues: TopicFormProps["initialValues"] = { title: topic.title, description: topic.description };

  const updateTopic = useUpdateTopic();
  const onSubmit: TopicFormProps["onSubmit"] = async (v) => {
    const { data } = await updateTopic({ variables: { id: topic.id, input: v } });
    if (!data) return;
    navigate(routes["/topics/:topicId"].path({ topicId: data.updateTopic.id }));
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

export const TopicEdit = () => {
  const { topicId } = useParams();

  const { uid } = useAuth();
  const topic = useTopicEdit(topicId!);

  if (!topic) return null;
  if (uid !== topic.user.id) return <Navigate to={routes["/"].path()} />;
  return <TopicEditView topic={topic} />;
};
