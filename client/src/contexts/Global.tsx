import { useState } from "react";
import { createContainer } from "unstated-next";

type State = {
  redirect: string | null;
};

const useGlobalContainer = () => {
  const [state, setState] = useState<State>({ redirect: null });
  const setRedirect = (redirect: string | null) => setState((prev) => ({ ...prev, redirect }));

  return {
    state,
    setRedirect,
  };
};

const _Global = createContainer(useGlobalContainer);
export const Global = _Global.Provider;
export const useGlobal = _Global.useContainer;
