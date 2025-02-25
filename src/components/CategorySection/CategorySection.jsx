import React, { useEffect, useState } from 'react';
import "./CategorySection.scss";
import SectionHeading from '../SectionHeading/SectionHeading';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import categoryImg from '../../assets/images/category.jpg';


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
    <div className='categorySection'>
      <div className='container'>
        <SectionHeading title='Season Collection' />
        <div className='slider-container'>
          <Swiper
            spaceBetween={15}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              768: {
                slidesPerView: 6,
              },
              480: {
                slidesPerView: 3,
              },
            }}
          >
            {
              updatedCategories.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className='categoryCard'>
                    <div className='categoryImg'>
                      <Link to={`/${item.path}`}>
                        <img src={categoryImg} alt="img" />
                      </Link>
                    </div>
                    <Link to={`/${item.path}`}><h6>{item.categoryName}</h6></Link>
                    <p>{10} items</p>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  )
};

export default CategorySection;