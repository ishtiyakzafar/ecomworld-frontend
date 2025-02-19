import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ADMIN_ROLE } from "../Helper/constant";

const AdminPrivateRoutes = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn && user.role === ADMIN_ROLE ? <Outlet /> : <Navigate to="/" />;
};

export default AdminPrivateRoutes;
