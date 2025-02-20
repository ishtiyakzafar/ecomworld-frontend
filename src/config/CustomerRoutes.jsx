import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { ADMIN_ROLE, CUSTOMER_ROLE } from "../Helper/constant";

const CustomerRoutes = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // referrer url
  if (isLoggedIn && user.role === CUSTOMER_ROLE && page) {
    return <Navigate to={`/${page}`} />;
  }

  // If logged in and user role is 'customer', restrict access to login page
  if (isLoggedIn && user.role !== ADMIN_ROLE && (location.pathname === "/login" || location.pathname === "/admin")) {
    return <Navigate to="/" />;
  }

  // Redirect admins to the admin page
  if (isLoggedIn && user.role === ADMIN_ROLE) {
    return <Navigate to="/admin/products" />;
  }

  return <Outlet />;
};

export default CustomerRoutes;
