import React from 'react';
import s from "./SectionHeading.module.scss";


const SectionHeading = ({ title }) => {
  return (
    <div className={s.sectionHeading}>
      {title}
    </div>
  )
};

export default SectionHeading;