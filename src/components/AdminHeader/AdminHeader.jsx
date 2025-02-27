import React, { useEffect } from 'react';
import './AdminHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogout } from '../../store/authSlice';
import { useLocation, useParams } from 'react-router-dom';
import { sideBarMenu } from '../../Helper/data';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const { id } = useParams();


  return (
    <div className='header'>
      <h5>
        {pathname === `/admin/orders/${id}` ? 'Order Details'
          :
          pathname === `/admin/products/${id}/update` ? 'Update Product'
            :
            sideBarMenu.find((item) => item.path === pathname)?.name}
      </h5>

      <div className='profile'>
        <h6>{user.name}</h6>

        <button onClick={() => dispatch(actionLogout())}>Logout</button>
      </div>
    </div>
  )
};

export default AdminHeader;