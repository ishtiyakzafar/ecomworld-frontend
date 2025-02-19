import React from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar_box'>
      <div className='sidebar'>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/dashboard">Products</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
          <li><Link to="/admin/customers">Customers</Link></li>
          <li><Link to="/admin/products/add">Add Product</Link></li>
          <li><Link to="/admin/categories">Categories</Link></li>
        </ul>
      </div>
    </div>
  )
};

export default Sidebar;