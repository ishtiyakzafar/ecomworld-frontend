import React from 'react';

const ButtonLoader = () => {
  return (
    <div className="spinner-border d-flex mx-auto" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
};

export default ButtonLoader;