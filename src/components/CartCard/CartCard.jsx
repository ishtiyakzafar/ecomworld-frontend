import React from 'react';
import './CartCard.scss';
import cartService from '../../services/cart';
import { useDispatch, useSelector } from 'react-redux';
import { actionDecQty, actionIncQty, actionRemoveFromCart } from '../../store/productSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { formatNumbers } from '../../Helper';
import Toast from '../Toast/Toast';


const CartCard = ({ isConfrim, isOrderSummary, item }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleIncreaseQty = async () => {
    try {
      if (isLoggedIn) await cartService.incCartProductQty(item._id);
      dispatch(actionIncQty(item._id));
    } catch (error) {
      toast.error(error);
    }
  }

  const handleDecreaseQty = async () => {
    try {
      if (isLoggedIn) await cartService.decCartProductQty(item._id);
      dispatch(actionDecQty(item._id));
    } catch (error) {
      toast.error(error);
    }
  }

  const deleteCartProduct = async () => {
    try {
      if (isLoggedIn) await cartService.deleteCartProduct(item._id);
      dispatch(actionRemoveFromCart(item._id));
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className='cart_card'>
      <Toast />
      <div className='image'>
        <Link to={`/product/${item.product._id}`}>
          <img src='https://ecomusnext-themesflat.vercel.app/images/products/orange-1.jpg' alt="img" />
        </Link>
      </div>

      <div className='box'>
        <div className='details'>
          <h1>{item.product.title}</h1>
          <p>{item.product.color}<span></span>{item.size}<span></span><small><LiaShippingFastSolid /> Shipping Free</small></p>
          <div className='price'>
            <h6>₹{formatNumbers(item.product.discountedPrice * item.quantity)}</h6>
            <del>₹{formatNumbers(item.product.price * item.quantity)}</del>
            <span>₹{formatNumbers((item.product.price * item.quantity) - (item.product.discountedPrice * item.quantity))} OFF</span>
          </div>
        </div>

        {!isConfrim &&
          <div className='quantity'>
            <BiMinus onClick={handleDecreaseQty} />
            <span>{item.quantity}</span>
            <BiPlus onClick={handleIncreaseQty} />
          </div>
        }
      </div>

      {!isOrderSummary &&
        <div className='deleteIcon'>
          <RiDeleteBin6Line onClick={deleteCartProduct} />
        </div>
      }
    </div>
  )
};

export default CartCard;