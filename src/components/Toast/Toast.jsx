import React from 'react';
import { ToastContainer } from 'react-toastify';
import './Toast.scss';

const Toast = () => {
  return (
    <div className='customeToast'>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        position="bottom-center"
        closeButton={false}
      />
    </div>
  )
};

export default Toast;