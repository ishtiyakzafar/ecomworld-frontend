import React, { useEffect, useState } from 'react';
import './OrderPage.scss';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import orderService from '../../services/order';
import OrderCard from '../../components/OrderCard/OrderCard';
import { formatNumbers } from '../../Helper';
import moment from 'moment';
import Empty from '../../components/Empty/Empty';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { toast } from 'react-toastify';
import Toast from '../../components/Toast/Toast';
import Spinner from '../../components/Spinner/Spinner';

const tabsData = [
  {
    id: 1,
    title: 'Ongoing Orders',
  },
  {
    id: 2,
    title: 'Cancelled Orders',
  },
  {
    id: 3,
    title: 'Past Orders',
  }
]

const OrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState(1);

  const fetchUserOrders = async () => {
    try {
      const res = await orderService.getOrderByUserId();
      setOrders(res);
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserOrders();
  }, [])

  return (
    <>
      <Toast />
      {loading ? <Spinner />
        :
        <div className='order-page'>
          <SectionHeading title='My Order' />

          {orders.length > 0 ?
            <>
              {/* <div className='tabs'>
              {
                tabsData.map((item) => (
                  <span
                    onClick={() => setTab(item.id)}
                    className={tab === item.id ? 'active' : ""}
                    key={item.id}
                  >
                    {item.title}(05)
                  </span>
                ))
              }
            </div> */}
              {orders.map((order) => (
                <div key={order._id} className='orders'>
                  <div className='detail'>
                    <div className='order-detail'>
                      <p><span>Order Id</span> #{order._id}</p>
                      <p><span>Order Date</span> {moment(order.orderDate).format("MMM Do YY")}</p>
                    </div>
                    <div className='order-detail'>
                      <p><span>Payment Method</span> COD</p>
                      <p><span>Order Total</span> ₹{formatNumbers(order.totalAmount)}</p>
                    </div>
                  </div>

                  <div className="shippingAddress">
                    <h5>Shipping address:</h5>
                    <h6>
                      {order.shippingAddress.fullName} <span>{order.shippingAddress.mobile}</span>
                    </h6>
                    <p>
                      {order.shippingAddress.streetAddress} - <span>{order.shippingAddress.pinCode}</span>
                    </p>
                  </div>

                  {
                    order.orderItem.map((item) => (
                      <OrderCard
                        fetchUserOrders={fetchUserOrders}
                        orderId={order._id}
                        key={item._id}
                        item={item}
                      />
                    ))
                  }
                </div>
              ))}
            </>
            :
            <Empty
              icon={<LiaShoppingBagSolid />}
              heading='No orders found!'
              title='Once you place an order, you’ll see it listed here.'
            />
          }
        </div>
      }
    </>
  )
};

export default OrderPage;