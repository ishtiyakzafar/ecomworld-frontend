import React, { useState, useEffect } from "react";
import './PriceRangeFilter.css';

const PriceRangeFilter = () => {
  // State to hold min and max price values
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // State to store the width and position of the highlight
  const [highlightStyle, setHighlightStyle] = useState({
    left: "0px",
    width: "100%",
  });

  // Function to update price range and highlight style
  const updatePriceRange = () => {
    const min = minPrice;
    const max = maxPrice;

    // Prevent overlap
    if (min > max - 10) {
      setMinPrice(max - 10);
    }
    if (max < min + 10) {
      setMaxPrice(min + 10);
    }

    // Update highlight position and width
    const sliderWidth = 300; // Fixed width of the slider container
    const minPercent = (min / 1000) * sliderWidth;
    const maxPercent = (max / 1000) * sliderWidth;

    setHighlightStyle({
      left: `${minPercent}px`,
      width: `${maxPercent - minPercent}px`,
    });
  };

  // Run updatePriceRange whenever minPrice or maxPrice changes
  useEffect(() => {
    updatePriceRange();
  }, [minPrice, maxPrice]);

  return (
    <div className="price-range">
      <h2>Price Range</h2>
      <div className="range-values">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>
      <div className="slider-container" style={{ position: "relative", height: "8px", background: "#ddd", borderRadius: "5px" }}>
        {/* Highlighted part */}
        <div
          style={{
            position: "absolute",
            top: "0",
            height: "8px",
            background: "#007bff",
            borderRadius: "5px",
            pointerEvents: "none",
            left: highlightStyle.left,
            width: highlightStyle.width,
          }}
        ></div>
        {/* Min Price Slider */}
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          style={{
            position: "absolute",
            width: "100%",
            height: "8px",
            background: "none",
            // - webkitAppearance: "none",
            appearance: "none",
            zIndex: 2,
          }}
        />
        {/* Max Price Slider */}
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{
            position: "absolute",
            width: "100%",
            height: "8px",
            background: "none",
            // - webkitAppearance: "none",
            appearance: "none",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
