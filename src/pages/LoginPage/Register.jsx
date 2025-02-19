import React, { useState } from "react";
import authService from "../../services/auth";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../store/authSlice";
import { getCartItems } from "../../utils";
import { validateSignup } from "../../Helper";
import { toast } from "react-toastify";

const Register = ({ setStep }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));

    setErrorMsg((prev) => {
      const newErrors = { ...prev };
      return validateSignup(name, value, newErrors, user);
    });
  };



  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = user;

    if (getCartItems()) {
      data.cartItems = getCartItems();
    }

    try {
      const res = await authService.signup({ name, email, password });
      dispatch(actionLogin(res.userDetails));
      if (getCartItems()) localStorage.removeItem('cart');
    } catch (error) {
      toast.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="row g-3">
      <div className="col-md-12">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          style={{ borderColor: errorMsg.name ? "#FF6666" : "" }}
          autoComplete="off"
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={user.name}
          onChange={handleOnChange}
        />
        {errorMsg.name && <small>{errorMsg.name}</small>}
      </div>
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
          name="email"
          value={user.email}
          onChange={handleOnChange}
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
          name="password"
          value={user.password}
          onChange={handleOnChange}
        />
        {errorMsg.password && <small>{errorMsg.password}</small>}
      </div>
      <div className="col-md-12">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          style={{ borderColor: errorMsg.cpassword ? "#FF6666" : "" }}
          autoComplete="off"
          type="password"
          className="form-control"
          id="cpassword"
          name="cpassword"
          value={user.cpassword}
          onChange={handleOnChange}
        />
        {errorMsg.cpassword && <small>{errorMsg.cpassword}</small>}
      </div>
      <div className="col-md-12">
        <span onClick={() => setStep(1)}>
          Already have an account? Log in
        </span>
      </div>
      <div className="col-md-6 mt-4">
        <button
          disabled={
            Object.values(user).some(value => value.trim() === "") ||
            Object.values(errorMsg).some(value => value.trim() !== "") ||
            loading
          }
          type="submit"
        >
          {
            loading ?
              <div class="spinner-border d-flex mx-auto" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              :
              "Register"
          }
        </button>
      </div>
    </form>
  );
};

export default Register;
