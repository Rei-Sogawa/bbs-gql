import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const usePaginateQuery = () => {
  const query = useQuery();
  const _first = query.get("first") ?? undefined;
  const _after = query.get("after") ?? undefined;
  const _last = query.get("last") ?? undefined;
  const _before = query.get("before") ?? undefined;
  return {
    first: !(_first || _last) ? 10 : _first ? Number(_first) : undefined,
    after: _after,
    last: _last ? Number(_last) : undefined,
    before: _before,
  };
};

export const usePaginateNavigate = ({
  startCursor,
  endCursor,
}: {
  startCursor?: string | null;
  endCursor?: string | null;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onFirst = () => {
    navigate(location.pathname + "?first=10");
  };
  const onPrevious = () => {
    navigate(location.pathname + "?last=10&before=" + startCursor);
  };
  const onNext = () => {
    navigate(location.pathname + "?first=10&after=" + endCursor);
  };
  const onLast = () => {
    navigate(location.pathname + "?last=10");
  };
  return {
    onFirst,
    onPrevious,
    onNext,
    onLast,
  };
};
