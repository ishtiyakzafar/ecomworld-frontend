import React, { useEffect, useState } from 'react';
import './OrderDetails.scss';
import { toast } from 'react-toastify';
import { formatNumbers, getOrderStatus } from '../../../Helper';
import orderService from '../../../services/order';
import { IoMdCheckmark } from "react-icons/io";
import Toast from '../../../components/Toast/Toast';
import { useParams } from 'react-router-dom';

const paymentStatus = [
  {
    title: "Pending",
    value: "PENDING"
  },
  {
    title: "Paid",
    value: "PAID"
  },
  {
    title: "Refunded",
    value: "REFUNDED"
  },
  {
    title: "Cancelled",
    value: "CANCELLED"
  },
]

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  const fetchOrderDetails = async () => {
    try {
      const res = await orderService.getOrderById(id);
      setOrder(res);
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    fetchOrderDetails();
  }, [])

  const updateOrderStatus = async (orderId, productId, status) => {
    try {
      await orderService.updateOrderStatus({ orderId, productId, status });
      toast.success('Order status updated succussfully');
      fetchOrderDetails();
    } catch (error) {
      toast.error(error);
    }
  };

  const updatePaymentStatus = async (orderId, productId, status) => {
    try {
      await orderService.updatePaymentStatus({ orderId, productId, status });
      toast.success('Payment status updated succussfully');
      fetchOrderDetails();
    } catch (error) {
      toast.error(error);
    }
  };

  const resetOrderStatus = async (orderId, productId) => {
    try {
      await orderService.resetOrderStatus({ orderId, productId });
      toast.success('Order status reset succussfully');
      fetchOrderDetails();
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <Toast />
      <div className='orderDetails'>
        <div className='content'>
          <h5>Order Details:</h5>
          <table className="orderDetailTable table align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Size</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody className='orderDetailInfo'>
              {
                order.orderItem?.map((item) => (
                  <tr key={item._id}>
                    <td className='productImg'>
                      <img src={'https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/y/g/34-jeans-bt008-laheja-original-imagqqbsfgmdhcvn.jpeg?q=70'} alt="img" />
                    </td>
                    <td>{item.productId.title}</td>
                    <td>₹{formatNumbers(item.productId.discountedPrice)}</td>
                    <td>{item.quantity}</td>
                    <td>{item.size}</td>
                    <td>
                      <div class="dropdown orderStatusDropdown">
                        {item.orderCancelled.status ?
                          <span className='orderStatus CANCELLED'>
                            CANCELLED
                          </span>
                          :
                          item.orderReturned.status ?
                            <span className='orderStatus RETURNED'>
                              RETURNED
                            </span>
                            :
                            <>
                              <span className={`orderStatus ${item.orderStatus} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                                {item.orderStatus}
                              </span>
                              <ul class="dropdown-menu">
                                {
                                  getOrderStatus(item).map((status) => (
                                    <li
                                      onClick={() => {
                                        if (status.isEnable && !status.isChecked) {
                                          updateOrderStatus(order._id, item.productId._id, status.value)
                                        }
                                      }}
                                      key={status.value}
                                      style={{ color: status.color }}
                                    >
                                      {status.title} {status.isChecked && <IoMdCheckmark />}
                                    </li>
                                  ))
                                }

                                {item.orderStatus !== 'INPROGRESS' &&
                                  <li style={{ color: 'red' }} onClick={() => resetOrderStatus(order._id, item.productId._id)}>Reset</li>
                                }
                              </ul>
                            </>
                        }
                      </div>
                    </td>
                    <td>
                      <div class="dropdown paymentStatusDropdown">
                        <span className={`paymentStatus ${item.paymentStatus} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                          {item.paymentStatus}
                        </span>
                        <ul class="dropdown-menu">
                          {
                            paymentStatus.map((status) => (
                              <li
                                onClick={() => updatePaymentStatus(order._id, item.productId._id, status.value)}
                                key={status.value}
                              >
                                {status.title}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <div className='customerDetails'>
            <div className='basicDetail'>
              <h5>Customer Details:</h5>
              <div className='detail'>
                <p>Full Name</p>
                <span>{order.shippingAddress?.userId.name}</span>
              </div>
              <div className='detail'>
                <p>Email</p>
                <span>{order.shippingAddress?.userId.email}</span>
              </div>
              <div className='detail'>
                <p>Mobile</p>
                <span>9142829719</span>
              </div>
            </div>

            <div className="shippingAddress">
              <h5>Shipping Address:</h5>

              <div className="detail">
                <div>
                  <h6>
                    {order.shippingAddress?.fullName} <span>{order.shippingAddress?.mobile}</span>
                  </h6>
                  <p>
                    {order.shippingAddress?.streetAddress} - <span>{order.shippingAddress?.pinCode}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default OrderDetails;