import React from "react";
import "./PageNotFound.scss";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <div className="container">
        <div className="content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you're looking for doesn't exist.</p>
          <NavLink to="/">Go to Home</NavLink>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
