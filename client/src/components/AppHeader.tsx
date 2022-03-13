import { ReactNode } from "react";

type AppHeaderProps = {
  children: ReactNode;
};

export const AppHeader = ({ children }: AppHeaderProps) => {
  return <div className="text-lg font-bold">{children}</div>;
};
