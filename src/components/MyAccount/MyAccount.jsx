import './MyAccount.scss';
import React, { useState } from "react";
import authService from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateUser } from "../../store/authSlice";
import SectionHeading from '../SectionHeading/SectionHeading';
import { toast } from 'react-toastify';
import { emailRegex, isResetPassValidated, passwordRegex } from '../../Helper';
import userService from '../../services/user';
import Toast from '../Toast/Toast';
import ButtonLoader from '../ButtonLoader/ButtonLoader';


const MyAccount = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const [showInst, setShowInst] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });
  const [resetPassword, setResetPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [error, setError] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setResetPassword((prev) => ({ ...prev, [name]: value }));

    setError((prev) => ({ ...prev, [name]: value.trim() === "" }));

    if (name === 'newPassword') {
      setShowInst(value ? !passwordRegex.test(value) : false);

      if (resetPassword.confirmNewPassword) {
        setIsPassMatch(value ? resetPassword.confirmNewPassword !== value : false);
      }
    }

    if (name === 'confirmNewPassword') {
      setIsPassMatch(value ? resetPassword.newPassword !== value : false);
    }
  };



  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      const res = await userService.updateUser({ name, email });
      dispatch(actionUpdateUser(res.user))
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!isResetPassValidated(resetPassword, showInst, isPassMatch)) return false;

    try {
      setIsLoading(true);
      const { token } = await authService.getAccessToken();
      const res = await userService.resetPassword({ token, currentPassword: resetPassword.currentPassword, newPassword: resetPassword.newPassword });
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='myAccount'>
      <Toast />
      <SectionHeading title='My Account' />
      <form className="row g-2 g-md-3">
        <div className="col-md-12">
          <div className='heading'>Contact Details</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            style={{ borderColor: errorMsg.name ? "#FF6666" : "" }}
            autoComplete="off"
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              setErrorMsg((prev) => ({ ...prev, name: !value ? "Please enter your name" : "" }));
            }}
          />
          {errorMsg.name && <small>{errorMsg.name}</small>}
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            style={{ borderColor: errorMsg.email ? "#FF6666" : "" }}
            autoComplete="off"
            required
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
        <div className="col-md-6 mt-4">
          <button
            onClick={handleUpdateUser}
            disabled={!name || !email || !emailRegex.test(email) || loading}
            type="button"
          >
            {loading ? <ButtonLoader /> : "Update"}
          </button>
        </div>
      </form>

      <form className="row g-2 g-md-3 mt-3">
        <div className="col-md-12">
          <div className='heading'>Reset Password</div>
        </div>
        <div className="col-md-12">
          <label htmlFor="currentPassword" className="form-label">
            Current Password
          </label>
          <input
            style={{ borderColor: error.currentPassword ? "#FF6666" : "" }}
            value={resetPassword.currentPassword}
            onChange={handleOnChange}
            autoComplete="off"
            type="password"
            className="form-control"
            id="currentPassword"
            name='currentPassword'
          />
          {error.currentPassword && <small>Please enter your current password</small>}
        </div>
        <div className="col-md-12">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            style={{ borderColor: error.newPassword ? "#FF6666" : "" }}
            value={resetPassword.newPassword}
            onChange={handleOnChange}
            autoComplete="off"
            type="password"
            className="form-control"
            id="newPassword"
            name='newPassword'
          />
          {error.newPassword && !resetPassword.newPassword && <small>Please enter your new password</small>}
          {showInst && <small>Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.</small>}
        </div>
        <div className="col-md-12">
          <label htmlFor="confirmNewPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            style={{ borderColor: error.confirmNewPassword ? "#FF6666" : "" }}
            value={resetPassword.confirmNewPassword}
            onChange={handleOnChange}
            autoComplete="off"
            type="password"
            className="form-control"
            id="confirmNewPassword"
            name='confirmNewPassword'
          />
          {error.confirmNewPassword && !resetPassword.confirmNewPassword && <small>Please confirm your new password</small>}
          {isPassMatch && <small>Password do not match</small>}
        </div>
        <div className="col-md-6 mt-4">
          <button
            disabled={!isResetPassValidated(resetPassword, showInst, isPassMatch) || isLoading}
            onClick={handleResetPassword} type="button">
            {isLoading ? <ButtonLoader /> : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  )
};

export default MyAccount;