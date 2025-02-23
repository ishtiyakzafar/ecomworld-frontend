import React from 'react';
import s from "./BestSellerSection.module.scss";
import SectionHeading from '../SectionHeading/SectionHeading';
import ProductCard from '../ProductCard/ProductCard';

const BestSellerSection = ({ products }) => {

  return (
    <div className={s.bestSeller}>
      <div className='container'>
        <SectionHeading title='Best Seller' />
        <div className='row g-2 g-md-4'>
          {
            products.slice(0, 4).map((item) => (
              <div key={item._id} className='col-6 col-md-4 col-lg-3'>
                <ProductCard item={item} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default BestSellerSection;