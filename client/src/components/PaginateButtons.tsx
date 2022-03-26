import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

type PaginateButtonsProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
};

export const PaginateButtons = ({
  hasPrevious,
  hasNext,
  onFirst,
  onPrevious,
  onNext,
  onLast,
}: PaginateButtonsProps) => {
  return (
    <div className="flex justify-center">
      <div className="btn-group">
        <button className="btn" onClick={onFirst}>
          <FaAngleDoubleLeft />
        </button>
        <button className="btn" disabled={!hasPrevious} onClick={onPrevious}>
          <FaAngleLeft />
        </button>
        <button className="btn btn-disabled">...</button>
        <button className="btn" disabled={!hasNext} onClick={onNext}>
          <FaAngleRight />
        </button>
        <button className="btn" onClick={onLast}>
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};
