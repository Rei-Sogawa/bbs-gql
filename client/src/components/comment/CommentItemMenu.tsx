import { AppEllipsisMenu } from "../AppEllipsisMenu";

type CommentItemMenuProps = {
  onEdit: () => void;
  onDelete: () => Promise<void>;
};

export const CommentItemMenu = ({ onEdit, onDelete }: CommentItemMenuProps) => {
  return (
    <AppEllipsisMenu>
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
    </AppEllipsisMenu>
  );
};
