import { useLocation, useNavigate } from "react-router-dom";

import { useGlobal } from "../../contexts/Global";
import { routes } from "../../routes";

export const CommentFormBeforeLogIn = () => {
  const { setRedirect } = useGlobal();

  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    setRedirect(location.pathname);
    navigate(routes["/log-in"].path());
  };

  return (
    <div>
      <div className="textarea textarea-bordered h-16">
        <button onClick={onClick} className="btn-link">
          Log in to comment...
        </button>
      </div>
      <button className="mt-2 btn btn-sm">Reply</button>
    </div>
  );
};
