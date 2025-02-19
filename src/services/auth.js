import http from "./http";

const signin = (data) => {
  return http.post('auth/signin', data);
}
const signup = (data) => {
  return http.post('auth/signup', data);
}
const getAccessToken = () => {
  return http.get('auth/access-token');
}

const authService = {
  signin,
  signup,
  getAccessToken,
};

export default authService;