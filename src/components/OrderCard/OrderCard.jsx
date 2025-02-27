import React from 'react';
import './OrderCard.scss';
import { Link } from 'react-router-dom';
import { formatNumbers } from '../../Helper';
import checkedIcon from '../../assets/icons/checked.svg';
import moment from 'moment';
import orderService from '../../services/order';
import TrackOrderDrawer from './TrackOrderDrawer/TrackOrderDrawer';
import { FaAngleRight } from 'react-icons/fa6';
import smallImg from '../../assets/images/small_img.jpg';
import Swal from 'sweetalert2';

const OrderCard = ({ orderId, fetchUserOrders, item }) => {

  const handleOrderStatus = (status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status === 1 ? 'cancel' : status === 2 ? 'return' : 'cancel return'} this order!`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          if (status === 1) {
            await orderService.cancelOrder({ orderId, productId: item.productId._id });
          } else if (status === 2) {
            await orderService.returnOrder({ orderId, productId: item.productId._id });
          } else {
            await orderService.cancelReturn({ orderId, productId: item.productId._id });
          }
          fetchUserOrders();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error} `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  return (
    <div className='order-card'>
      <div className='image'>
        <Link to={`/ product / ${item.productId._id} `}>
          <img src={smallImg} alt="img" />
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
            <div className='cancel' onClick={() => handleOrderStatus(1)}>Cancel <FaAngleRight /></div>
          }

          {(!item.orderReturned.status && item.orderStatus === 'DELIVERED') &&
            <div className='cancel' onClick={() => handleOrderStatus(2)}>Return <FaAngleRight /></div>
          }

          {(!item.orderRefund.status && item.orderReturned.status) &&
            <div className='cancel' onClick={() => handleOrderStatus(3)}>Cancel Return <FaAngleRight /></div>
          }

          <TrackOrderDrawer item={item} />
        </div>
      </div>
    </div>
  )
};

export default OrderCard;