import axios from "axios";
import store from "../store/store";
import { actionLogout } from "../store/authSlice";

class RestfulProvider {
  constructor() {
    this.setCommonHeaders();
  }

  setCommonHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    user?.token && (axios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`);
  };

  makeCall = (url, data, axiosMethod) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (localStorage.getItem("user")) {
      this.setCommonHeaders();
    }

    return new Promise((resolve, reject) => {
      const response = axiosMethod(`${import.meta.env.VITE_APP_API_URL}/api/${url}`, data, header);
      response
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (error.response?.status === 401 || error.response?.data?.message === 'Authorization required') {
            store.dispatch(actionLogout());
          }
          reject(error.response?.data?.message || "Server is down, please check after some time !!");
        });
    });
  };

  patch = (url, data) => {
    return this.makeCall(url, data, axios.patch);
  };

  put = (url, data) => {
    return this.makeCall(url, data, axios.put);
  };

  post = (url, data) => {
    return this.makeCall(url, data, axios.post);
  };

  get = (url) => {
    return this.makeCall(url, undefined, axios.get);
  };

  delete = (url, request) => {
    return this.makeCall(url, { data: request }, axios.delete);
  };
}

export default new RestfulProvider();