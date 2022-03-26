import { Field, Form } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";

export type FormValues = {
  content: string;
};

export type CommentFormProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  onCancel?: () => void;
};

export const CommentForm = ({
  initialValues,
  onSubmit,
  onCancel = () => {
    return;
  },
}: CommentFormProps) => {
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
                  minRows={2}
                  {...input}
                />
              </div>
            )}
          </Field>

          <div className="flex space-x-2 mt-2">
            <button type="submit" className="btn btn-sm">
              Reply
            </button>
            {initialValues.content && (
              <button type="button" className="btn btn-sm btn-ghost" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    />
  );
};
