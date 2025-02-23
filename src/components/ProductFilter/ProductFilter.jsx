import React, { useEffect, useState } from 'react';
import s from "./ProductFilter.module.scss";
import { MdClose } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCategoryData } from '../../Helper';


const ProductFilter = ({ showDrawer, setShowDrawer }) => {
  const { topLevel, secondLevel, thirdLevel } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.app);
  const [showCategoryMenu, setShowCategoryMenu] = useState(true);
  const [showPriceMenu, setShowPriceMenu] = useState(true);
  const [showColorMenu, setShowColorMenu] = useState(true);
  const [showSizeMenu, setShowSizeMenu] = useState(true);
  const [showAvailabilityMenu, setShowAvailabilityMenu] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [availability, setAvailability] = useState([
    {
      id: 1,
      checked: false,
      avl: 'in',
      name: 'In Stock',
    },
    {
      id: 2,
      checked: false,
      avl: 'out',
      name: 'Out of Stock',
    },
  ]);
  const [priceRange, setPriceRange] = useState([
    {
      id: 1,
      minPrice: 100,
      maxPrice: 500,
      checked: false,
    },
    {
      id: 2,
      minPrice: 500,
      maxPrice: 1000,
      checked: false,
    },
    {
      id: 3,
      minPrice: 1000,
      maxPrice: 1500,
      checked: false,
    },
    {
      id: 4,
      minPrice: 1500,
      maxPrice: 2000,
      checked: false,
    },
    {
      id: 5,
      minPrice: 2000,
      maxPrice: 2500,
      checked: false,
    },
  ]);
  const [colorRange, setColorRange] = useState([
    {
      id: 1,
      checked: false,
      color: 'red'
    },
    {
      id: 2,
      checked: false,
      color: 'green'
    },
    {
      id: 3,
      checked: false,
      color: 'blue'
    }
  ]);
  const [sizeRange, setSizeRange] = useState([
    {
      id: 1,
      checked: false,
      size: 'small'
    },
    {
      id: 2,
      checked: false,
      size: 'medium'
    },
    {
      id: 3,
      checked: false,
      size: 'large'
    }
  ]);
  const categoryParams = searchParams.get("category");
  const avlParams = searchParams.get("avl");
  const priceParams = searchParams.get("price");
  const colorParams = searchParams.get("color");
  const sizeParams = searchParams.get("size");

  // CLEAR FILTERS IF NO PARAMS IN URL 
  useEffect(() => {
    if (!categoryParams) {
      setCategoryData((prev) => prev.map((item) => ({ ...item, checked: false })));
    }
    if (!avlParams) {
      setAvailability((prev) => prev.map((item) => ({ ...item, checked: false })));
    }
    if (!priceParams) {
      setPriceRange((prev) => prev.map((item) => ({ ...item, checked: false })));
    }
    if (!colorParams) {
      setColorRange((prev) => prev.map((item) => ({ ...item, checked: false })));
    }
    if (!sizeParams) {
      setSizeRange((prev) => prev.map((item) => ({ ...item, checked: false })));
    }
  }, [searchParams])


  useEffect(() => {
    if (categories.length > 0) {
      setCategoryData(getCategoryData(categories, topLevel, secondLevel, thirdLevel, categoryParams));
    }
  }, [topLevel, secondLevel, thirdLevel, categories])


  useEffect(() => {
    if (avlParams) {
      availability.forEach(item => item.checked = avlParams.split(',').includes(item.avl));
    }
    if (priceParams) {
      priceRange.forEach(item => item.checked = priceParams.split(',').includes(`${item.minPrice}-${item.maxPrice}`));
    }
    if (colorParams) {
      colorRange.forEach(item => item.checked = colorParams.split(',').includes(item.color));
    }
    if (sizeParams) {
      sizeRange.forEach(item => item.checked = sizeParams.split(',').includes(item.size));
    }
  }, [])

  // CLEAR ALL FILTER
  const handleClearFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("avl");
    newParams.delete("price");
    newParams.delete("color");
    newParams.delete("size");
    setSearchParams(newParams);

    setCategoryData((prev) => prev.map((item) => ({ ...item, checked: false })));
    setAvailability((prev) => prev.map((item) => ({ ...item, checked: false })));
    setPriceRange((prev) => prev.map((item) => ({ ...item, checked: false })));
    setColorRange((prev) => prev.map((item) => ({ ...item, checked: false })));
    setSizeRange((prev) => prev.map((item) => ({ ...item, checked: false })));
  }

  return (
    <>
      <div className={showDrawer ? `${s.filterDrawer} ${s.show}` : `${s.filterDrawer}`}>
        <div className={s.header}>
          <span><CiFilter /> FILTER</span>
          <MdClose className={s.close} onClick={() => setShowDrawer(false)} />
          <small onClick={handleClearFilter}>Clear All</small>
        </div>

        <div className={s.filterContent}>
          {categoryData.length > 0 &&
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
                    <li key={item.id}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={item.checked}
                          id={`cat${item.id}`}
                          onChange={(e) => {
                            const { checked } = e.target;
                            const updatedCategory = categoryData.map((cat) => cat.id === item.id ? { ...cat, checked } : cat);
                            setCategoryData(updatedCategory);

                            const newParams = new URLSearchParams(searchParams);
                            const selectedCategory = updatedCategory.filter((cat) => cat.checked).map((val) => val.name);

                            selectedCategory.length > 0 ? newParams.set("category", selectedCategory.join(",")) : newParams.delete("category")
                            setSearchParams(newParams);
                          }}
                        />
                        <label className="form-check-label" htmlFor={`cat${item.id}`}>
                          {item.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          }

          <div className={s.filterByAvailability}>
            <div
              onClick={() => setShowAvailabilityMenu(!showAvailabilityMenu)}
              className={s.heading}
            >
              <h4>Availability</h4>
              {showAvailabilityMenu ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
            </div>
            {showAvailabilityMenu && (
              <div className={s.menuList}>
                {
                  availability.map((item) => (
                    <div key={item.id} className="form-check">
                      <input className="form-check-input shadow-none" type="radio" name="availability"
                        id={`availability${item.id}`}
                        checked={item.checked}
                        onChange={() => {
                          const updatedAvl = availability.map((val) => ({ ...val, checked: val.id === item.id }));
                          setAvailability(updatedAvl);

                          const newParams = new URLSearchParams(searchParams);
                          const selectedAvl = updatedAvl.filter((val) => val.checked).map((val) => val.avl);

                          selectedAvl.length > 0 ? newParams.set("avl", selectedAvl.join(",")) : newParams.delete("avl")
                          setSearchParams(newParams);
                        }}
                      />
                      <label className="form-check-label" htmlFor={`availability${item.id}`}>
                        {item.name}
                      </label>
                    </div>
                  ))
                }
              </div>
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
              <ul>
                {priceRange.map((item) => (
                  <li key={item.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item.checked}
                        id={`price${item.id}`}
                        onChange={(e) => {
                          const { checked } = e.target;
                          const updatedPriceRange = priceRange.map((price) => price.id === item.id ? { ...price, checked } : price);
                          setPriceRange(updatedPriceRange);

                          const newParams = new URLSearchParams(searchParams);
                          const selectedPrice = updatedPriceRange.filter((price) => price.checked).map((val) => `${val.minPrice}-${val.maxPrice}`);

                          selectedPrice.length > 0 ? newParams.set("price", selectedPrice.join(",")) : newParams.delete("price")
                          setSearchParams(newParams);
                        }}
                      />
                      <label className="form-check-label" htmlFor={`price${item.id}`}>
                        ₹{item.minPrice} - ₹{item.maxPrice}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
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
            {showColorMenu &&
              <ul>
                {colorRange.map((item) => (
                  <li key={item.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`color${item.id}`}
                        checked={item.checked}
                        onChange={(e) => {
                          const { checked } = e.target;
                          const updatedColorRange = colorRange.map((color) => color.id === item.id ? { ...color, checked } : color);
                          setColorRange(updatedColorRange);

                          const newParams = new URLSearchParams(searchParams);
                          const selectedColor = updatedColorRange.filter((color) => color.checked).map((val) => val.color);

                          selectedColor.length > 0 ? newParams.set("color", selectedColor.join(",")) : newParams.delete("color")
                          setSearchParams(newParams);
                        }}
                      />
                      <label className="form-check-label" htmlFor={`color${item.id}`}>
                        {item.color}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            }
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
                {sizeRange.map((item) => (
                  <li key={item.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`size${item.id}`}
                        checked={item.checked}
                        onChange={(e) => {
                          const { checked } = e.target;
                          const updatedSizeRange = sizeRange.map((size) => size.id === item.id ? { ...size, checked } : size);
                          setSizeRange(updatedSizeRange);

                          const newParams = new URLSearchParams(searchParams);
                          const selectedSize = updatedSizeRange.filter((size) => size.checked).map((val) => val.size);

                          selectedSize.length > 0 ? newParams.set("size", selectedSize.join(",")) : newParams.delete("size")
                          setSearchParams(newParams);
                        }}
                      />
                      <label className="form-check-label" htmlFor={`size${item.id}`}>
                        {item.size}
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