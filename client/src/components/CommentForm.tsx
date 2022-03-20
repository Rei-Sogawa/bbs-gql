import { Field, Form } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";

export type FormValues = {
  content: string;
};

type CommentFormProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
};

export const CommentForm = ({ initialValues, onSubmit }: CommentFormProps) => {
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
