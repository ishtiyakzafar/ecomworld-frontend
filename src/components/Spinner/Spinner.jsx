import React from 'react';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className='newspinner'>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
};

export default Spinner;