import React, { useEffect, useState } from 'react';
import s from "./ProductFilter.module.scss";
import { MdClose } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';

const categoryData = [
  {
    id: 1,
    name: 'Tops',
  },
  {
    id: 2,
    name: 'Bottoms',
  },
  {
    id: 3,
    name: 'Dresses',
  },
  {
    id: 4,
    name: 'Jackets',
  },
  {
    id: 5,
    name: 'Accessories',
  },
]

const sizeData = [
  {
    id: 2,
    size: 'S',
    item: 20,
  },
  {
    id: 3,
    size: 'M',
    item: 30,
  },
  {
    id: 4,
    size: 'L',
    item: 40,
  },
  {
    id: 5,
    size: 'XL',
    item: 50,
  },
]

const availabilityData = [
  {
    id: 1,
    product: 'In Stock',
  },
  {
    id: 2,
    product: 'Out of Stock',
  },
]

const ProductFilter = ({ showDrawer, setShowDrawer }) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState(false);
  const [priceRange, setPriceRange] = useState(0);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showAvailabilityMenu, setShowAvailabilityMenu] = useState(false);
  const [colorData, setColorData] = useState([
    {
      id: 1,
      isSelected: false,
      color: "red",
    },
    {
      id: 2,
      isSelected: false,
      color: "green",
    },
    {
      id: 3,
      isSelected: false,
      color: "blue",
    },
    {
      id: 4,
      isSelected: false,
      color: "yellow",
    },
    {
      id: 5,
      isSelected: false,
      color: "orange",
    },
  ]);


  const handleSelect = (item) => {
    setColorData(
      colorData.map((color) => {
        if (color.id === item.id) {
          return { ...color, isSelected: !color.isSelected };
        } else {
          return color;
        }
      })
    );
  };

  return (
    <>
      <div className={showDrawer ? `${s.filterDrawer} ${s.show}` : `${s.filterDrawer}`}>
        <div className={s.header}>
          <span><CiFilter /> FILTER</span>
          <MdClose className={s.close} onClick={() => setShowDrawer(false)} />
        </div>

        <div className={s.filterContent}>
          <div className={s.filterCategory}>
            <div
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className={s.heading}
            >
              <h4>Category</h4>
              {showCategoryMenu ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
            </div>
            {showCategoryMenu && (
              <ul>
                {categoryData.map((item) => (
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={item.name}
                      />
                      <label className="form-check-label" for={item.name}>
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={s.filterByAvailability}>
            <div
              onClick={() => setShowAvailabilityMenu(!showAvailabilityMenu)}
              className={s.heading}
            >
              <h4>Availability</h4>
              {showAvailabilityMenu ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
            </div>
            {showAvailabilityMenu && (
              <ul>
                {availabilityData.map((item) => (
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={item.product}
                      />
                      <label className="form-check-label" for={item.product}>
                        {item.product}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={s.filterPrice}>
            <div
              onClick={() => setShowPriceMenu(!showPriceMenu)}
              className={s.heading}
            >
              <h4>Price</h4>
              {showPriceMenu ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
            </div>

            {showPriceMenu && (
              <>
                <label for="customRange1" className="form-label">
                  Upto ₹{priceRange * 10}
                </label>
                <input
                  onChange={(e) => setPriceRange(e.target.value)}
                  value={priceRange}
                  type="range"
                  className="form-range"
                  id="customRange1"
                />
                <div className={s.priceRangeValue}>
                  <span>₹0</span>
                  <span>₹1000</span>
                </div>
              </>
            )}
          </div>

          <div className={s.filterByColor}>
            <div
              onClick={() => setShowColorMenu(!showColorMenu)}
              className={s.heading}
            >
              <h4>Color</h4>
              {showColorMenu ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
            </div>
            {showColorMenu && <div className={s.colorOption}>
              {colorData.map((item) => (
                <div style={{ border: item.isSelected ? "1px solid #ddd" : "", }} className={s.colorBorder}>
                  <div
                    style={{
                      transform: item.isSelected ? "scale(0.9)" : "",
                      background: item.color,
                    }}
                    onClick={() => handleSelect(item)}
                    className={s.color}
                  ></div>
                </div>
              ))}
            </div>}
          </div>

          <div className={s.filterBySize}>
            <div
              onClick={() => setShowSizeMenu(!showSizeMenu)}
              className={s.heading}
            >
              <h4>Size</h4>
              {showSizeMenu ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
            </div>
            {showSizeMenu && (
              <ul>
                {sizeData.map((item) => (
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={item.size}
                      />
                      <label className="form-check-label" for={item.size}>
                        {item.size}  ({item.item})
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={showDrawer ? `${s.screenCover} ${s.show}` : `${s.screenCover}`}></div>
    </>
  );
};

export default ProductFilter;