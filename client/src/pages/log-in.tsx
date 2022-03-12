import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { VFC } from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";

import { routes } from "../routes";

const useLogIn = () => {
  const login = ({ email, password }: { email: string; password: string }) => {
    return signInWithEmailAndPassword(getAuth(), email, password);
  };
  return login;
};

type FormValues = {
  email: string;
  password: string;
  confirm: string;
};

const LogInForm: VFC = () => {
  const initialValues = { email: "", password: "", confirm: "" };

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Field name="email">
            {({ input }) => (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered input-primary"
                  placeholder="Email"
                  autoComplete="off"
                  required
                  {...input}
                />
              </div>
            )}
          </Field>

          <Field name="password">
            {({ input }) => (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered input-primary"
                  placeholder="Password"
                  required
                  {...input}
                />
              </div>
            )}
          </Field>

          <button type="submit" className="mt-6 btn">
            Log In
          </button>
        </form>
      )}
    />
  );
};

export const LogIn: VFC = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="pt-24">
        <div className="w-xsm py-4 px-8 mx-auto rounded-md bg-white flex flex-col space-y-2">
          <div className="text-lg font-bold text-center">Log In</div>
          <LogInForm />
          <Link className="link link-primary" to={routes["/sign-up"].path()}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
