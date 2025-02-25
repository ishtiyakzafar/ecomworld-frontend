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
  const [image, setImage] = useState(images[0]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="productImageSection">
      <div className="image_preview">
        {
          images.map((item) => (
            <img
              onMouseEnter={() => setImage(item)}
              key={item._id}
              className={`img-fluid ${item._id === image._id && 'active'}`}
              src={item.img}
              alt="img"
            />
          ))
        }
      </div>
      <div className="image_view">
        <img className='img-fluid' src={image.img} alt="img" />
      </div>
    </div>
  );
};

export default ProductImageSection;
