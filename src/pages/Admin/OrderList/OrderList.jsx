import React, { useEffect, useState } from 'react';
import './OrderList.scss';
import { toast } from 'react-toastify';
import moment from 'moment';
import orderService from '../../../services/order';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { formatNumbers } from '../../../Helper';
import Toast from '../../../components/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const res = await orderService.getAllOrders();
      setOrderList(res);
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const handleDeleteOrder = async (id) => {
    try {
      const res = await orderService.deleteOrder(id);
      fetchAllOrders();
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className='orderList'>
      <Toast />
      <div className="table-responsive">
        <table style={{ width: "max-conxtent" }} className="table align-middle">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Payment Mode</th>
              <th>Total Item</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
                <p className='pt-3'>Loading...</p>
                :
                orderList.length > 0
                  ?
                  orderList.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{moment(order.createdAt).format("MMM Do 'YY")}</td>
                      <td>{order.paymentDetails.paymentMethod}</td>
                      <td>{order.totalItem}</td>
                      <td>₹{formatNumbers(order.totalAmount)}</td>
                      <td className='action'>
                        <div className='act_btn' onClick={() => handleDeleteOrder(order._id)}>Delete <RiDeleteBin6Line /></div>
                        <div className='act_btn' onClick={() => navigate(`/admin/orders/${order._id}`)}>View Details <FaAngleRight /></div>
                      </td>
                    </tr>
                  ))
                  :
                  <p className='pt-3'>Data not found!</p>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default OrderList;