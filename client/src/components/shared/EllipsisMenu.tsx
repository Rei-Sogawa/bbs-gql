import { FC } from "react";
import { FaEllipsisV } from "react-icons/fa";

export const EllipsisMenu: FC = ({ children }) => {
  return (
    <div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-xs border-gray-200">
          <FaEllipsisV />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          {children}
        </ul>
      </div>
    </div>
  );
};
