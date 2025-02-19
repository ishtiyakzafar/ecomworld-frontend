import React from 'react';
import s from "./OnSaleSection.module.scss";
import SectionHeading from '../SectionHeading/SectionHeading';
import ProductCard from '../ProductCard/ProductCard';

const OnSaleSection = ({ products }) => {

  return (
    <div className={s.onSale}>
      <div className='container'>
        <SectionHeading title='On Sale' />
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

export default OnSaleSection;