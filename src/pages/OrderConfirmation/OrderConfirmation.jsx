import React, { useEffect, useState } from 'react';
import './OrderConfirmation.scss';
import success from '../../assets/icons/success.svg';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import orderService from '../../services/order';
import Loader from '../../components/Loader/Loader';


const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await orderService.getOrderById(id);
        setOrder(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOrderDetail();
  }, [])

  return (
    <>
      {loading ? <Loader />
        :
        <div className='orderConfirm'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='content'>
                  <img src={success} alt="success" />
                  <h1>Thank you for your order!</h1>
                  <small>{moment(order.orderDate).format("Do MMM YYYY")}<span></span>{moment(order.orderDate).format('h:mma')}</small>
                  <p>Your order <span>#{order._id}</span> has been successfully placed and will be processed within 24hr during working days.</p>
                  <div className='action'>
                    <button onClick={() => navigate('/profile/orders')} className='outline'>View Order</button>
                    <button onClick={() => navigate('/')}>Continue Shopping</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )

};

export default OrderConfirmation;