import { VFC } from "react";

const SignUpForm: VFC = () => {
  return (
    <form className="flex flex-col">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" placeholder="Email" className="input input-primary input-bordered" />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" placeholder="Password" className="input input-primary input-bordered" />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password Confirm</span>
        </label>
        <input type="password" placeholder="Password Confirm" className="input input-primary input-bordered" />
      </div>

      <div className="mt-6 btn">Sign Up</div>
    </form>
  );
};

export const SignUp: VFC = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="w-xsm pt-4 pb-8 px-8 rounded-md bg-white">
        <div className="text-lg font-bold text-center">Sign Up</div>
        <SignUpForm />
      </div>
    </div>
  );
};
