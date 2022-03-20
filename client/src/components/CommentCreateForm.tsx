import { useLocation, useNavigate } from "react-router-dom";

import { useGlobal } from "../contexts/Global";
import { useCreateComment } from "../hooks/useComments";
import { routes } from "../routes";
import { CommentForm, FormValues } from "./CommentForm";

type CommentCreateFormProps = {
  rootId: string;
  parentId: string;
};

export const CommentCreateForm = ({ rootId, parentId }: CommentCreateFormProps) => {
  const createComment = useCreateComment();

  const initialValues: FormValues = { content: "" };

  const onSubmit = async ({ content }: FormValues) => {
    await createComment({ variables: { input: { content, rootId, parentId } } });
  };

  return <CommentForm {...{ initialValues, onSubmit }} />;
};

export const CommentCreateFormBeforeLogIn = () => {
  const { setRedirect } = useGlobal();

  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    setRedirect(location.pathname);
    navigate(routes["/log-in"].path());
  };

  return (
    <div>
      <div className="textarea textarea-bordered h-16">
        <button onClick={onClick} className="btn-link">
          Log in to comment...
        </button>
      </div>
      <button className="mt-2 btn btn-sm">Reply</button>
    </div>
  );
};
