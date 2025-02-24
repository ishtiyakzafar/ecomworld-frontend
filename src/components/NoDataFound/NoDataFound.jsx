import React from 'react';
import './NoDataFound.scss';
import noData from '../../assets/images/nodata.svg';

const NoDataFound = () => {
  return (
    <div className='noDataFound'>
      <img src={noData} alt="noData" />
      <p>Oops! It looks like there’s no data available </p>
      <small>No products match your criteria. Adjust your filters and try again!</small>
    </div>
  )
};

export default NoDataFound;