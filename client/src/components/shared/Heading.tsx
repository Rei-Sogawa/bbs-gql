import { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
};

export const Heading = ({ children }: HeadingProps) => {
  return <div className="text-lg font-bold">{children}</div>;
};
