import React from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div id="scrollableDiv">
      <Header />
      <div className="mainContent">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
