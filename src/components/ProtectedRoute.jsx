import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

function ProtectedRoute({children}) {
  const {user} = useSelector((state) => state.users);

  const navigate = useNavigate();
  const location = useLocation();

  const [deny, setDeny] = useState(false);
  const currentPath = location.pathname.substring(1);

  useEffect(() => {
    if (!user) navigate("/login", {replace: true})

    switch (currentPath) {
      case 'products':
        if (!user.permissions.products.read) {
          setDeny(true);
        } else {
          setDeny(false);
        }
        break;
      case 'users':
        if (!user.permissions.users.read) {
          setDeny(true);
        } else {
          setDeny(false);
        }
        break;
      default:
        setDeny(false);
        break;
    }
  }, [user]);

  if (deny) {
    return (
      <Alert color="danger" className="m-auto" fade={false}>
        <h2>You don't have permission to access this page!</h2>
      </Alert>
    );
  }

  return children
}

export default ProtectedRoute