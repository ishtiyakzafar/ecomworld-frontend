import React from "react";
import "./DataLoader.scss";

const DataLoader = () => {
  return (
    <div className="dataLoader">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default DataLoader;
