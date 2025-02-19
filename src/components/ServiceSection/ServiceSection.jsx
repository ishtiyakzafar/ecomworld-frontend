import React from 'react';
import s from "./ServiceSection.module.scss";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Slider from 'react-slick';

const services = [
  {
    id: 1,
    icon: <LiaShippingFastSolid />,
    title: 'Free Shipping',
    description: 'Free shipping on all order'
  },
  {
    id: 2,
    icon: <MdOutlinePayment />,
    title: 'Secure Payment',
    description: '100% secure payment'
  },
  {
    id: 3,
    icon: <BiSupport />,
    title: '24/7 Support',
    description: 'Online support 24/7'
  },
  {
    id: 4,
    icon: <LiaExchangeAltSolid />,
    title: '14 Day Returns',
    description: 'Within 30 days for an excahnge'
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

const ServiceSection = () => {
  return (
    <div className='container'>
      <div className={s.serviceSection}>
        <Slider {...settings}>
          {
            services.map((item) => (
              <div key={item.id} className={s.serviceCardxxx}>
                <div className={s.serviceCard}>
                  {item.icon}
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  )
};

export default ServiceSection;