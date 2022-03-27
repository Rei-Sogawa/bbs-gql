import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { VFC } from "react";
import { Field, Form } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";

import { SignUpLayout } from "../components/layout/SignUpLayout";
import { Heading } from "../components/shared/Heading";
import { useGlobal } from "../contexts/Global";
import { routes } from "../routes";

type FormValues = {
  email: string;
  password: string;
};

export const useLogIn = () => {
  const login = ({ email, password }: FormValues) => {
    return signInWithEmailAndPassword(getAuth(), email, password);
  };
  return login;
};

const LogInForm: VFC = () => {
  const {
    state: { redirect },
    setRedirect,
  } = useGlobal();

  const navigate = useNavigate();

  const login = useLogIn();

  const initialValues: FormValues = { email: "", password: "" };

  const onSubmit = async (values: FormValues) => {
    await login(values);
    navigate(redirect || routes["/"].path());
    setRedirect(null);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="mt-4 btn">
            Log In
          </button>
        </form>
      )}
    />
  );
};

export const LogIn: VFC = () => {
  return (
    <SignUpLayout>
      <div className="text-center">
        <Heading>Log In</Heading>
      </div>
      <LogInForm />
      <div className="mt-4 ml-1 flex flex-col space-y-1">
        <Link className="link link-primary" to={routes["/sign-up"].path()}>
          Sign Up
        </Link>
        <Link className="link link-primary" to={routes["/"].path()}>
          Back
        </Link>
      </div>
    </SignUpLayout>
  );
};
