import http from "./http";

const addAddress = (data) => {
  return http.post('address', data);
}
const getAddresses = () => {
  return http.get('address');
}
const deleteAddress = (id) => {
  return http.delete(`address/${id}`);
}
const updateAddress = (data) => {
  return http.put(`address/${data._id}`, data);
}
const getAddressById = (id) => {
  return http.get(`address/${id}`);
}

const addressService = {
  addAddress,
  getAddresses,
  deleteAddress,
  updateAddress,
  getAddressById,
};

export default addressService;