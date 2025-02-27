import React from 'react';
import "./SectionHeading.scss";


const SectionHeading = ({ title }) => {
  return (
    <div className='sectionHeading'>
      {title}
    </div>
  )
};

export default SectionHeading;