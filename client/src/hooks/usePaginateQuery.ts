import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const usePaginateQuery = () => {
  const query = useQuery();
  const first = query.get("first");
  const after = query.get("after");
  const last = query.get("last");
  const before = query.get("before");
  return { first: !first && !last ? "10" : first, after, last, before };
};
