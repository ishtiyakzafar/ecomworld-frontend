import React from 'react';
import './OrderCard.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { formatNumbers } from '../../Helper';
import checkedIcon from '../../assets/icons/checked.svg';
import moment from 'moment';
import orderService from '../../services/order';
import TrackOrderDrawer from './TrackOrderDrawer/TrackOrderDrawer';
import { FaAngleRight } from 'react-icons/fa6';

const OrderCard = ({ orderId, fetchUserOrders, item }) => {

  const handleCancelOrder = async () => {
    try {
      await orderService.cancelOrder({ orderId, productId: item.productId._id });
      toast.success('Order cancelled succussfully');
      fetchUserOrders();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleReturnOrder = async () => {
    try {
      await orderService.returnOrder({ orderId, productId: item.productId._id });
      toast.success('Return request submitted successfully');
      fetchUserOrders();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCancelReturn = async () => {
    try {
      await orderService.cancelReturn({ orderId, productId: item.productId._id });
      toast.success('Return request cancelled successfully');
      fetchUserOrders();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='order-card'>
      <div className='image'>
        <Link to={`/product/${item.productId._id}`}>
          <img src='https://ecomusnext-themesflat.vercel.app/images/products/orange-1.jpg' alt="img" />
        </Link>
      </div>

      <div className='orderInfo'>
        <div className='box'>
          <div className='details'>
            <div>
              <h1>{item.productId.title}</h1>
              <h6>{item.productId.color}<span></span>{item.size}<span></span>{item.quantity}</h6>
            </div>
            <h5>₹{formatNumbers(item.productId.discountedPrice * item.quantity)}</h5>
            <p>{item.orderCancelled.status ? "CANCELLED" : item.orderRefund.status ? "Return Completed" : item.orderReturned.status ? "Return Requested" : item.orderStatus}</p>
          </div>

          <div className='order-status'>
            <div className='data'>
              <img src={checkedIcon} alt="checkedIcon" />
              <small>Order Status</small>
              <span>{item.orderCancelled.status ? "CANCELLED" : item.orderRefund.status ? "Return Completed" : item.orderReturned.status ? "Return Requested" : item.orderStatus}</span>
            </div>
            <p>Estimated Delivery Date ({moment(item.deliveryDate).format("MMM Do YY")})</p>
          </div>
        </div>
        <div className='action'>
          {(!item.orderCancelled.status && item.orderStatus !== 'DELIVERED') &&
            <div className='cancel' onClick={handleCancelOrder}>Cancel <FaAngleRight /></div>
          }

          {(!item.orderReturned.status && item.orderStatus === 'DELIVERED') &&
            <div className='cancel' onClick={handleReturnOrder}>Return <FaAngleRight /></div>
          }

          {(!item.orderRefund.status && item.orderReturned.status) &&
            <div className='cancel' onClick={handleCancelReturn}>Cancel Return <FaAngleRight /></div>
          }

          <TrackOrderDrawer item={item} />
        </div>
      </div>
    </div>
  )
};

export default OrderCard;