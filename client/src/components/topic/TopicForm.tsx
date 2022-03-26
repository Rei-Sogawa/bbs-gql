import { Field, Form } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";

export type FormValues = {
  title: string;
  content: string;
};

export type TopicFormProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
};

export const TopicForm = ({ initialValues, onSubmit }: TopicFormProps) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="title">
            {({ input }) => (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-primary"
                  placeholder="Title"
                  required
                  {...input}
                />
              </div>
            )}
          </Field>

          <Field name="content">
            {({ input }) => (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">content</span>
                </label>
                <TextareaAutosize
                  className="textarea textarea-bordered textarea-primary"
                  placeholder="Content"
                  required
                  minRows={10}
                  {...input}
                />
              </div>
            )}
          </Field>

          <button type="submit" className="mt-4 btn">
            Save
          </button>
        </form>
      )}
    />
  );
};
