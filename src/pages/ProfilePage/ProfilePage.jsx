import React from 'react';
import './ProfilePage.scss';
import { FiUser } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom';
import OrderPage from '../OrderPage/OrderPage';
import MyAccount from '../../components/MyAccount/MyAccount';
import { actionLogout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { actionSetCart, actionSetCartCount, actionSetWishlist, actionSetWishlistCount } from '../../store/productSlice';
import { PiPackage } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import MyAddress from '../../components/MyAddress/MyAddress';


const ProfilePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  return (
    <div className='container'>
      <div className='profile-page'>
        <div className='profileSidebar'>
          <ul>
            <li className={slug === 'account' ? 'active' : ''}><Link to='/profile/account'><FiUser /> My Account</Link></li>
            <li className={slug === 'orders' ? 'active' : ''}><Link to='/profile/orders'><PiPackage /> My Orders</Link></li>
            <li className={slug === 'address' ? 'active' : ''}><Link to='/profile/address'><IoLocationOutline /> My Addresses</Link></li>
            <li
              onClick={() => {
                dispatch(actionLogout());
                dispatch(actionSetWishlist([]));
                dispatch(actionSetCart([]));
                dispatch(actionSetCartCount(0));
                dispatch(actionSetWishlistCount(0));
              }}
            ><span><CiLogout /> Sign Out</span></li>
          </ul>
        </div>
        <div className='profileContent'>
          {slug === 'account' && <MyAccount />}
          {slug === 'orders' && <OrderPage />}
          {slug === 'address' && <MyAddress />}
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;