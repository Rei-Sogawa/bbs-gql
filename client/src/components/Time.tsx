import { format } from "date-fns";

export const Time = ({ time }: { time: string }) => {
  return <div className="text-gray-500 text-sm">{format(new Date(time), "yyyy/MM/dd HH:mm")}</div>;
};
