import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ProtectedRoutes = () => {
  const { userId, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && !username) {
      toast("Please login to continue!", { duration: 3000 });
      navigate("/login");
    }
  }, [userId, username, navigate]);

  if (userId && username) return <Outlet />;
};
export default ProtectedRoutes;
