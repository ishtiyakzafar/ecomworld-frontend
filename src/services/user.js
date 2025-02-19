import http from "./http";

const login = (data) => {
  return http.post('users/login', data);
}
const register = (data) => {
  return http.post('users/register', data);
}
const getUserList = () => {
  return http.get('users');
}
const resetPassword = (data) => {
  return http.post('users/reset-password', data);
}
const updateUser = (data) => {
  return http.post('users/update', data);
}

const userService = {
  login,
  register,
  getUserList,
  resetPassword,
  updateUser,
};

export default userService;