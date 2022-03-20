import { Field, Form } from "react-final-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import { useGlobal } from "../contexts/Global";
import { routes } from "../routes";

type FormValues = {
  content: string;
};

type CommentFormViewProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
};

const CommentFormView = ({ initialValues, onSubmit }: CommentFormViewProps) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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

type CommentFormProps = {
  rootId: string;
  parentId: string;
};

export const CommentForm = ({ rootId, parentId }: CommentFormProps) => {
  const initialValues: FormValues = { content: "" };
  const onSubmit = (v: FormValues) => Promise.resolve();
  return <CommentFormView {...{ initialValues, onSubmit }} />;
};

export const CommentFormBeforeLogIn = () => {
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
