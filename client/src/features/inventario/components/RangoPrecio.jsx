import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function RangoPrecio() {

  const [value, setValue] = useState([0, 99999]);

  return (
    <div>
        <span className="d-flex justify-self-start ms-2">Rango de precio:</span>
      <div className="labels d-flex justify-content-between mb-2 px-2">
        <span>Min: {value[0]} ₡</span>
        <span>Max: {value[1]} ₡</span>
      </div>
      <div className="slider-container">

        <RangeSlider min={0} max={99999} value={value} onInput={setValue} />
      </div>
    </div>
  );
}
