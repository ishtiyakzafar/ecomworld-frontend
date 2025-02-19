import React from 'react';
import './OrderConfirmation.scss';
import success from '../../assets/icons/success.svg';
import { useNavigate } from 'react-router-dom';


const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className='orderConfirm'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='content'>
              <img src={success} alt="success" />
              <h1>Thank you for your order!</h1>
              <small>18th June 2024<span></span>1:00pm</small>
              <p>Your order <span>#ORD20250131001</span> has been successfully placed and will be processed within 24hr during working days.</p>
              <div className='action'>
                <button onClick={() => navigate('/profile/orders')} className='outline'>View Order</button>
                <button onClick={() => navigate('/')}>Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default OrderConfirmation;