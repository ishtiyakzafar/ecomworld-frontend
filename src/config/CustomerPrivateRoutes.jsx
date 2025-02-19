import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { CUSTOMER_ROLE } from "../Helper/constant";

const CustomerPrivateRoutes = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn && user.role === CUSTOMER_ROLE ? <Outlet /> : <Navigate to="/" />;
};

export default CustomerPrivateRoutes;
