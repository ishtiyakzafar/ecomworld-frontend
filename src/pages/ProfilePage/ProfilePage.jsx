import React from 'react';
import './ProfilePage.scss';
import { FiUser } from "react-icons/fi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom';
import OrderPage from '../OrderPage/OrderPage';
import MyAccount from '../../components/MyAccount/MyAccount';
import { actionLogout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { actionSetCart, actionSetCartCount, actionSetWishlist, actionSetWishlistCount } from '../../store/productSlice';

const ProfilePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  return (

    <div className='container'>
      <div className='profile-page'>
        <div className='profileSidebar'>
          <ul>
            <li className={slug === 'account' ? 'active' : ''}><Link to='/profile/account'><FiUser /> My Account</Link></li>
            <li className={slug === 'orders' ? 'active' : ''}><Link to='/profile/orders'><LiaShoppingBagSolid /> My Orders</Link></li>
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
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;