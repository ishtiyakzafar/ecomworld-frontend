import React from 'react';
import './AdminHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogout } from '../../store/authSlice';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='header'>
      <h5>Products</h5>

      <div className='profile'>
        <div className='user_name'>
          <h6>{user.name}</h6>
        </div>

        <button onClick={() => dispatch(actionLogout())}>Logout</button>
      </div>
    </div>
  )
};

export default AdminHeader;