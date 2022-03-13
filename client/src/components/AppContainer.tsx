import { ReactNode } from "react";

type AppContainerProps = {
  size: "md" | "lg";
  children: ReactNode;
};

export const AppContainer = ({ size, children }: AppContainerProps) => {
  if (size === "md") return <div className="w-screen-md mx-auto my-6">{children}</div>;
  if (size === "lg") return <div className="w-screen-lg mx-auto my-6">{children}</div>;
  return <div>{children}</div>;
};
