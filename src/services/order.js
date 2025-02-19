
import http from "./http";

const addOrder = (data) => {
  return http.post('orders', data);
}
const getOrderByUserId = () => {
  return http.get('orders');
}
const getOrderById = (id) => {
  return http.get(`orders/${id}`);
}
const getAllOrders = () => {
  return http.get('orders/all');
}
const deleteOrder = (id) => {
  return http.delete(`orders/${id}`);
}
const updateOrderStatus = (data) => {
  return http.post('orders/order-status', data);
}
const updatePaymentStatus = (data) => {
  return http.post('orders/payment-status', data);
}
const cancelOrder = (data) => {
  return http.post('orders/cancel', data);
}
const resetOrderStatus = (data) => {
  return http.post('orders/reset-status', data);
}
const returnOrder = (data) => {
  return http.post('orders/return', data);
}
const cancelReturn = (data) => {
  return http.post('orders/cancel-return', data);
}

const orderService = {
  addOrder,
  getOrderByUserId,
  getOrderById,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  resetOrderStatus,
  returnOrder,
  cancelReturn,
};

export default orderService;