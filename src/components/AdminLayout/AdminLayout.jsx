import React from "react";
import "./AdminLayout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import AdminHeader from "../AdminHeader/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="page_container">
      <Sidebar />
      <div className="page_content">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
