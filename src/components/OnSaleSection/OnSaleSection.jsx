import React, { useState } from 'react';
import s from "./OnSaleSection.module.scss";
import SectionHeading from '../SectionHeading/SectionHeading';
import ProductCard from '../ProductCard/ProductCard';

const OnSaleSection = ({ products }) => {
  const [productNum, setProductNum] = useState(4);

  return (
    <div className={s.onSale}>
      <div className='container'>
        <SectionHeading title='On Sale' />
        <div className='row g-3 g-md-4'>
          {
            products.slice(0, productNum).map((item) => (
              <div key={item._id} className='col-6 col-md-4 col-lg-3'>
                <ProductCard item={item} />
              </div>
            ))
          }
        </div>
        <div className='text-center pt-3 pt-md-5'>
          <button onClick={() => setProductNum(productNum === 4 ? products.length : 4)} className='outline'>View {productNum === 4 ? "more" : "less"}</button>
        </div>
      </div>
    </div>
  )
};

export default OnSaleSection;