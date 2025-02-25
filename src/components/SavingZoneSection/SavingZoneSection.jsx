import React from 'react';
import s from "./SavingZoneSection.module.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from 'react-slick';
import advImg1 from '../../assets/images/adv1.jpg';
import advImg2 from '../../assets/images/adv2.jpg';
import advImg3 from '../../assets/images/adv3.jpg';


const products = [
  {
    id: 1,
    title: 'Urban Shirts',
    img: advImg1,
    discount: 'UPTO 20% OFF',
    description: 'Live in Confort'
  },
  {
    id: 2,
    title: 'Urban Shirts',
    img: advImg2,
    discount: 'UPTO 20% OFF',
    description: 'Live in Confort'
  },
  {
    id: 3,
    title: 'Urban Shirts',
    img: advImg3,
    discount: 'UPTO 20% OFF',
    description: 'Live in Confort'
  },
]

const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
  // autoplay: true,
  autoplaySpeed: 5000,
  // cssEase: "linear",
  pauseOnHover: false,

  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

const SavingZoneSection = () => {
  return (
    <div className='container'>
      <div className={s.savingZoneSection}>
        <Slider {...settings}>
          {
            products.map((item) => (
              <div key={item.id} className={s.savingZoneCard}>
                <div className={s.cardImage}>
                  <a href="#"><img src={item.img} alt="img" /></a>
                </div>
                <div className={s.savingZoneInfo}>
                  <h2>{item.title}</h2>
                  <small>{item.description}</small>
                  <p>{item.discount}</p>
                  <button>Shop now <FaArrowRightLong /></button>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  )
};

export default SavingZoneSection;