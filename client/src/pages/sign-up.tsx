import classNames from "classnames";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { VFC } from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";

import { routes } from "../routes";

const useSignUp = () => {
  const signUp = ({ email, password }: { email: string; password: string }) => {
    return createUserWithEmailAndPassword(getAuth(), email, password);
  };
  return signUp;
};

type FormValues = {
  email: string;
  password: string;
  confirm: string;
};

const SignUpForm: VFC = () => {
  const initialValues = { email: "", password: "", confirm: "" };

  const validate = (values: FormValues) => {
    let res = {};
    if (values.password !== values.confirm) res = { ...res, confirm: "Must match" };
    return res;
  };

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form
      initialValues={initialValues}
      validate={validate}
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

          <Field name="confirm">
            {({ input, meta }) => (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password Confirm</span>
                </label>
                <input
                  type="password"
                  className={classNames(
                    "input input-bordered",
                    meta.error && meta.touched ? "input-error" : "input-primary"
                  )}
                  placeholder="Password Confirm"
                  required
                  {...input}
                />
                {meta.error && meta.touched && <span className="ml-1 mt-2 text-sm text-red-600">{meta.error}</span>}
              </div>
            )}
          </Field>

          <button type="submit" className="mt-6 btn">
            Sign Up
          </button>
        </form>
      )}
    />
  );
};

export const SignUp: VFC = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="pt-24">
        <div className="w-xsm py-4 px-8 mx-auto rounded-md bg-white flex flex-col space-y-2">
          <div className="text-lg font-bold text-center">Sign Up</div>
          <SignUpForm />
          <Link className="link link-primary" to={routes["/log-in"].path()}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
