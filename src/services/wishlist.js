import http from "./http";

const addItemToWhislist = (data) => {
  return http.post('wishlist', data);
}
const getWishlist = () => {
  return http.get('wishlist');
}
const deleteItemFromWishlist = (id) => {
  return http.delete(`wishlist/${id}`);
}
const getWishlistCount = () => {
  return http.get('wishlist/count');
}

const wishlistService = {
  addItemToWhislist,
  getWishlist,
  deleteItemFromWishlist,
  getWishlistCount,
};

export default wishlistService; 