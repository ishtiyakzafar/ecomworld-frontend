import React, { useEffect, useState } from 'react';
import "./HeroSection.scss";
import hero1 from '../../assets/images/image-960x862 (1).jpg';
import hero2 from '../../assets/images/image-960x862 (2).jpg';
import hero3 from '../../assets/images/image-960x862 (3).jpg';
import hero4 from '../../assets/images/hero_img3.jpg';
import hero5 from '../../assets/images/hero_img4.jpg';
import hero6 from '../../assets/images/hero_img5.jpg';


import { FaArrowRightLong } from "react-icons/fa6";
import Slider from 'react-slick';

const heroContent = [
  {
    titleFirst: 'Summer',
    titleSecond: 'Adventures',
    description: 'Dive into the season of warmth with seaside escapes, vibrant festivals, and refreshing getaways.',
  },
  {
    titleFirst: 'Winter',
    titleSecond: 'Wonderland',
    description: 'Discover the magic of frosty days with cozy getaways and thrilling snow activities.',
  },
  {
    titleFirst: 'Spring',
    titleSecond: 'Awakening',
    description: 'Revel in the beauty of blooming flowers and rejuvenating outdoor experiences.',
  }
];


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSlideChange = (slide) => {
    const heroContent = document.querySelector('.heroContent');
    heroContent.classList.add('animate');
    setCurrentSlide(slide);
  };

  const onSlideCccchange = (current, next) => {
    const heroContent = document.querySelector('.heroContent');
    heroContent.classList.remove('animate');
  }

  useEffect(() => {
    const heroContent = document.querySelector('.heroContent');
    heroContent.classList.add('animate');
  }, [])


  const settings = {
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: "linear",
    pauseOnHover: false,

    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // waitForAnimate: false,
    afterChange: onSlideChange,
    beforeChange: onSlideCccchange,
  };


  return (
    <div className='heroSection'>
      <div className='row g-0 align-items-centerx'>
        <div className='col-md-6 order-md-0 order-1'>
          <div className='heroContentBox'>
            <div className='heroContent'>
              <h1>{heroContent[currentSlide].titleFirst} <br /> {heroContent[currentSlide].titleSecond}</h1>
              <p>{heroContent[currentSlide].description}</p>
              <button>Shop collection <FaArrowRightLong /></button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='heroImg'>
            <Slider {...settings}>
              <img src={hero1} alt="hero" />
              <img src={hero2} alt="hero" />
              <img src={hero3} alt="hero" />
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
};

export default HeroSection;