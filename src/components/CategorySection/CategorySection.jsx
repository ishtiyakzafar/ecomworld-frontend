import React, { useEffect, useState } from 'react';
import s from "./CategorySection.module.scss";
import SectionHeading from '../SectionHeading/SectionHeading';
import Slider from 'react-slick';
import categoryService from '../../services/categories';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const settings = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: false,

  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    },
    {
      breakpoint: 996,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
  ]
};


const CategorySection = () => {
  const { categories } = useSelector((state) => state.app);
  const [updatedCategories, setUpdatedCategories] = useState([]);

  useEffect(() => {
    let data = [];

    for (const ele of categories) {
      data.push({
        id: ele._id,
        categoryName: ele.topLevelCategory,
        path: ele.topLevelCategory
      })

      for (const secCate of ele.secondLevelCategories) {
        data.push({
          id: secCate._id,
          categoryName: secCate.secondLevelCategory,
          path: `${ele.topLevelCategory}/${secCate.secondLevelCategory}`
        })

        for (const thrCate of secCate.thirdLevelCategories) {
          data.push({
            id: thrCate._id,
            categoryName: thrCate.thirdLevelCategory,
            path: `${ele.topLevelCategory}/${secCate.secondLevelCategory}/${thrCate.thirdLevelCategory}`
          })
        }
      }
    }

    setUpdatedCategories(data);
  }, [categories])

  return (
    <div className={s.categorySection}>
      <div className='container'>
        <SectionHeading title='Season Collection' />
        <div className="slider-container">
          <Slider {...settings}>
            {
              updatedCategories.map((item) => (
                <div key={item.id} className={s.categoryCard}>
                  <div className={s.categoryImg}>
                    <Link to={`/products/${item.path}`}>
                      <img src={'https://ecomusnext-themesflat.vercel.app/images/collections/collection-circle-1.jpg'} alt="img" />
                    </Link>
                  </div>
                  <Link to={`/products/${item.path}`}><h6>{item.categoryName}</h6></Link>
                  <p>{10} items</p>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </div>
  )
};

export default CategorySection;