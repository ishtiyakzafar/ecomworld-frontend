import React from 'react';
import { ToastContainer } from 'react-toastify';

const Toast = () => {
  return (
    <ToastContainer
      autoClose={3000}
      hideProgressBar={true}
      position="bottom-center"
      closeButton={false}
    />
  )
};

export default Toast;