import { EllipsisMenu } from "../shared/EllipsisMenu";

type CommentItemMenuProps = {
  onEdit: () => void;
  onDelete: () => Promise<void>;
};

export const CommentItemMenu = ({ onEdit, onDelete }: CommentItemMenuProps) => {
  return (
    <EllipsisMenu>
      <li>
        <button className="btn btn-ghost" onClick={onEdit}>
          Edit
        </button>
      </li>
      <li>
        <button className="btn btn-ghost" onClick={onDelete}>
          Delete
        </button>
      </li>
    </EllipsisMenu>
  );
};
