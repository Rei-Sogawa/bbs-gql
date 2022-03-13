import { ReactNode } from "react";

type AppHeadingProps = {
  children: ReactNode;
};

export const AppHeading = ({ children }: AppHeadingProps) => {
  return <div className="text-lg font-bold">{children}</div>;
};
