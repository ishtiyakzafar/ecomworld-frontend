import React, { useEffect, useState } from 'react';
import "./CartPage.scss";
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetCart } from '../../store/productSlice';
import cartService from '../../services/cart';
import { toast } from 'react-toastify';
import CartCard from '../../components/CartCard/CartCard';
import Empty from '../../components/Empty/Empty';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import Toast from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';


const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.product);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        setLoading(true);
        const res = await cartService.getCart();
        const data = res.map((item) => ({ product: item.productId, _id: item._id, quantity: item.quantity, size: item.size }));
        dispatch(actionSetCart(data));
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchUserCart();
    }
  }, [])

  return (
    <div className='cartPageBox'>
      <Toast />
      {loading ?
        <Loader />
        :
        <div className='container'>
          <SectionHeading title='My Cart' />
          {cart.length > 0 ?
            <div className='row'>
              <div className='col-lg-8'>
                {cart.map((item) => (
                  <CartCard key={item._id} item={item} />
                ))}
              </div>
              <div className='col-lg-4'>
                <OrderSummary showBtn={true} cart={cart} />
              </div>
            </div>
            :
            <Empty
              icon={<LiaShoppingBagSolid />}
              heading='Your cart is empty!'
              title='Explore our collection and add your favorite items to the cart.'
            />
          }
        </div>
      }
    </div>
  )
};

export default CartPage;