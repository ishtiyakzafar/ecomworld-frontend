import React from 'react';
import s from "./NewArrivalsSection.module.scss";
import SectionHeading from '../SectionHeading/SectionHeading';
import ProductCard from '../ProductCard/ProductCard';

const NewArrivalsSection = ({ products }) => {

  return (
    <div className={s.newArrivals}>
      <div className='container'>
        <SectionHeading title='New Arrivals' />
        <div className='row g-4'>
          {
            products.slice(0, 4).map((item) => (
              <div className='col-6 col-md-4 col-lg-3'>
                <ProductCard key={item._id} item={item} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default NewArrivalsSection;