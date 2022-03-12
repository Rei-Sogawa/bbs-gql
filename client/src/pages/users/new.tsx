import { VFC } from "react";
import { Field, Form } from "react-final-form";

type FormValues = {
  displayName: string;
};

const UserCreateForm: VFC = () => {
  const initialValues: FormValues = { displayName: "" };

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="displayName">
            {({ input }) => (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Display Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-primary"
                  placeholder="Display Name"
                  required
                  {...input}
                />
              </div>
            )}
          </Field>

          <button type="submit" className="mt-6 btn">
            Save
          </button>
        </form>
      )}
    />
  );
};

export const UserNew: VFC = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="pt-24">
        <div className="w-xsm py-4 px-8 mx-auto rounded-md bg-white flex flex-col space-y-2">
          <div className="text-lg font-bold text-center">User Profile</div>
          <UserCreateForm />
        </div>
      </div>
    </div>
  );
};
