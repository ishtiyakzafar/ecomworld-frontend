import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../../store/authSlice";
import authService from "../../../services/auth";
import { toast } from "react-toastify";
import './AdminLogin.scss';
import { getCartItems } from "../../../utils";
import Toast from "../../../components/Toast/Toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
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
        <form onSubmit={handleLogin} className="row g-3">
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              autoComplete="off"
              required
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              autoComplete="off"
              required
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6 mt-4">
            <button
              disabled={loading}
              type="submit">
              {
                loading ?
                  <div class="spinner-border d-flex mx-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  :
                  "Sign in"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
