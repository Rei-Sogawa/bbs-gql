import { ReactNode, VFC } from "react";

type SignUpLayoutProps = {
  children: ReactNode;
};

export const SignUpLayout: VFC<SignUpLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="h-full md:h-auto md:pt-20 bg-gray-100">
        <div className="md:w-screen-xs h-full md:h-auto mx-auto px-8 py-4 md:rounded-md bg-white">{children}</div>
      </div>
    </div>
  );
};
