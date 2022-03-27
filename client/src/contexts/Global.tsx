import { useState } from "react";
import { createContainer } from "unstated-next";

import { PaginateInput } from "../graphql/generated";

type State = {
  redirect: string | null;
  topicsPaginateInput: PaginateInput;
};

const useGlobalContainer = () => {
  const [state, setState] = useState<State>({
    redirect: null,
    topicsPaginateInput: { first: 10, after: undefined, last: undefined, before: undefined },
  });
  const setRedirect = (redirect: string | null) => setState((prev) => ({ ...prev, redirect }));
  const setTopicsPaginateInput = (topicsPaginateInput: PaginateInput) =>
    setState((prev) => ({ ...prev, topicsPaginateInput }));

  return {
    state,
    setRedirect,
    setTopicsPaginateInput,
  };
};

const _Global = createContainer(useGlobalContainer);
export const Global = _Global.Provider;
export const useGlobal = _Global.useContainer;
