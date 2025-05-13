import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}) {
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", {replace: true})
  }, [user]);

  return children
}

export default ProtectedRoute