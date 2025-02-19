import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./ProductImageSection.scss";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import product2 from "../../assets/images/product2.jpg";
import product3 from "../../assets/images/product3.jpg";
import product4 from "../../assets/images/product4.jpg";
import product5 from "../../assets/images/product5.jpg";
import product9 from "../../assets/images/product9.jpg";

const images = [
  {
    _id: 2,
    img: product2,
  },
  {
    _id: 3,
    img: product3,
  },
  {
    _id: 4,
    img: product4,
  },
  {
    _id: 5,
    img: product5,
  },
  {
    _id: 9,
    img: product9,
  },
];

const ProductImageSection = ({ details }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [imageUrl, setImageUrl] = useState(product2);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="productImageSection">
      {/* <div className="row g-4">
        <div className="col-xl-2 col-12 order-xl-0 order-1">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            direction={width > 1200 ? "vertical" : "horizontal"}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {images.map((item) => (
              <SwiperSlide key={item._id}>
                <img src={item.img} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-xl-10 col-12">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {images.map((item) => (
              <SwiperSlide key={item._id}>
                <img src={item.img} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}

      <div className="image_preview">
        {
          images.map((item) => (
            <img onMouseEnter={() => setImageUrl(item.img)} key={item._id} className="img-fluid" src={item.img} alt="img" />
          ))
        }
      </div>
      <div className="image_view">
        <img className="img-fluid" src={imageUrl} alt="img" />
      </div>
    </div>
  );
};

export default ProductImageSection;
