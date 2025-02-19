import http from "./http";

const addToCart = (data) => {
  return http.post('cart', data);
}
const getCart = () => {
  return http.get('cart');
}
const deleteCartProduct = (id) => {
  return http.delete(`cart/${id}`);
}
const incCartProductQty = (id) => {
  return http.put(`cart/${id}/quantity/increase`);
}
const decCartProductQty = (id) => {
  return http.put(`cart/${id}/quantity/decrease`);
}
const getCartProductCount = () => {
  return http.get('cart/count');
}

const cartService = {
  addToCart,
  getCart,
  deleteCartProduct,
  incCartProductQty,
  decCartProductQty,
  getCartProductCount,
};

export default cartService;