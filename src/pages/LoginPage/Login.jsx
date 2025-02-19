import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../store/authSlice";
import authService from "../../services/auth";
import { toast } from "react-toastify";
import { getCartItems } from "../../utils";
import { emailRegex } from "../../Helper";
import Toast from "../../components/Toast/Toast";

const Login = ({ setStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { email, password };

    if (getCartItems()) data.cartItems = getCartItems();

    try {
      const res = await authService.signin(data);
      dispatch(actionLogin(res.userDetails));
      if (getCartItems()) localStorage.removeItem('cart');
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="row g-3">
      <Toast />
      <div className="col-md-12">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          style={{ borderColor: errorMsg.email ? "#FF6666" : "" }}
          autoComplete="off"
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (!value) {
              setErrorMsg((prev) => ({ ...prev, email: "Please enter your email address" }));
            } else if (!emailRegex.test(value)) {
              setErrorMsg((prev) => ({ ...prev, email: "Please enter your valid email address" }));
            } else {
              setErrorMsg((prev) => ({ ...prev, email: "" }));
            }
          }}
        />
        {errorMsg.email && <small>{errorMsg.email}</small>}
      </div>
      <div className="col-md-12">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          style={{ borderColor: errorMsg.password ? "#FF6666" : "" }}
          autoComplete="off"
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            if (!value) {
              setErrorMsg((prev) => ({ ...prev, password: "Please enter your password" }));
            } else {
              setErrorMsg((prev) => ({ ...prev, password: "" }));
            }
          }}
        />
        {errorMsg.password && <small>{errorMsg.password}</small>}
      </div>
      <div className="col-md-6">
        <span onClick={() => setStep(3)}>Forgot your password?</span>
      </div>
      <div className="col-md-6">
        <span onClick={() => setStep(2)}>
          New customer? Create your account
        </span>
      </div>
      <div className="col-md-6 mt-5">

        <button
          disabled={!email || !password || errorMsg.email || errorMsg.password || loading}
          type="submit"
        >
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
  );
};

export default Login;
