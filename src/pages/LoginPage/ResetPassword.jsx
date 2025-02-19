import React from "react";

const ResetPassword = ({ step, setStep }) => {
  return (
    <div>
      {step === 3 ? (
        <form className="row g-3">
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
            />
          </div>
          <div className="col-md-12">
            <small onClick={() => setStep(1)}>Back</small>
          </div>
          <div className="col-md-6 mt-4">
            <button onClick={() => setStep(4)} type="submit">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <form className="row g-3">
          <div className="col-md-12">
            <label htmlFor="npassword" className="form-label">
              New Password
            </label>
            <input
              autoComplete="off"
              required
              type="password"
              className="form-control"
              id="npassword"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="cnpassword" className="form-label">
              Confirm New Password
            </label>
            <input
              autoComplete="off"
              required
              type="password"
              className="form-control"
              id="cnpassword"
            />
          </div>
          <div className="col-md-12">
            <small onClick={() => setStep(3)}>Back</small>
          </div>
          <div className="col-md-6 mt-4">
            <button type="submit">Reset</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
