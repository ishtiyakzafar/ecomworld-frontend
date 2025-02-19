import React from 'react';
import './Empty.scss';
import { useNavigate } from 'react-router-dom';

const Empty = ({ icon, heading, title }) => {
  const navigate = useNavigate();

  return (
    <div className='empty'>
      <div className='icon'>{icon}</div>
      <h1>{heading}</h1>
      <p>{title}</p>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  )
};

export default Empty;