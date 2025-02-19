import React from 'react';
import s from "./ProductDetailsTags.module.scss";


const productTags = [
  {
    id: 1,
    title: 'Fabric',
    value: 'Cotton'
  },
  {
    id: 2,
    title: 'Color',
    value: 'Blue'
  },
  {
    id: 3,
    title: 'Size',
    value: 'Medium'
  },
  {
    id: 4,
    title: 'Pattern',
    value: 'Striped'
  },
  {
    id: 5,
    title: 'Occasion',
    value: 'Casual'
  },
  {
    id: 6,
    title: 'Sleeves',
    value: 'Full'
  },
  {
    id: 7,
    title: 'Neck',
    value: 'Round'
  }
];


const ProductDetailsTags = () => {
  return (
    <div className={s.productTags}>
      {
        productTags.map((item) => (
          <div key={item.id} className={s.tags}>
            <small>{item.title}</small>
            <p>{item.value}</p>
          </div>
        ))
      }
    </div>
  )
};

export default ProductDetailsTags;