import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../../store/authSlice";
import authService from "../../../services/auth";
import { toast } from "react-toastify";
import './AdminLogin.scss';
import { getCartItems } from "../../../utils";
import Toast from "../../../components/Toast/Toast";
import { emailRegex } from "../../../Helper";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });

  const handleLogin = async () => {

    if (!email) {
      setErrorMsg((prev) => ({ ...prev, email: "Please enter your email address" }))
    } else if (!emailRegex.test(email)) {
      setErrorMsg((prev) => ({ ...prev, email: "Please enter your valid email address" }));
    }
    if (!password) setErrorMsg((prev) => ({ ...prev, password: "Please enter your password" }));
    if (!email || !emailRegex.test(email) || !password) return false;

    setLoading(true);
    const data = { email, password };

    try {
      const res = await authService.signin(data);
      if (getCartItems()) localStorage.removeItem('cart');
      dispatch(actionLogin(res.userDetails));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminLoginPage">
      <Toast />
      <div className="box">
        <h1>Admin Login</h1>
        <form className="row g-2 g-md-3">
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              autoComplete="off"
              style={{ borderColor: errorMsg.password ? "#FF6666" : "" }}
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setErrorMsg((prev) => ({ ...prev, email: !value ? "Please enter your email address" : !emailRegex.test(value) ? "Please enter your valid email address" : "" }));
              }}
            />
            {errorMsg.email && <small>{errorMsg.email}</small>}
          </div>
          <div className="col-md-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              autoComplete="off"
              style={{ borderColor: errorMsg.password ? "#FF6666" : "" }}
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                setErrorMsg((prev) => ({ ...prev, password: !value ? "Please enter your password" : "" }));
              }}
            />
            {errorMsg.password && <small>{errorMsg.password}</small>}
          </div>
          <div className="col-md-6 mt-4 mt-md-5">
            <button
              onClick={handleLogin}
              disabled={loading}
              type="button"
            >
              {loading ? <ButtonLoader /> : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
