import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import { useGlobal } from "../contexts/Global";
import { useCreateComment } from "../hooks/useComments";
import { routes } from "../routes";

type FormValues = {
  content: string;
};

type CommentCreateFormViewProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
};

const CommentCreateFormView = ({ initialValues, onSubmit }: CommentCreateFormViewProps) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={(e) => handleSubmit(e)?.then(form.reset)}>
          <Field name="content">
            {({ input }) => (
              <div className="form-control">
                <TextareaAutosize
                  className="textarea textarea-bordered"
                  placeholder="Add a comment..."
                  required
                  rows={1}
                  {...input}
                />
              </div>
            )}
          </Field>

          <button type="submit" className="mt-2 btn btn-sm">
            Reply
          </button>
        </form>
      )}
    />
  );
};

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

  return <CommentCreateFormView {...{ initialValues, onSubmit }} />;
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
      <div className="textarea textarea-bordered">
        <button onClick={onClick} className="btn-link">
          Log in to comment
        </button>
      </div>
      <button className="mt-2 btn btn-sm">Reply</button>
    </div>
  );
};
