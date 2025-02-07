import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";


export default function RangoPrecio({ value, onChange }) {
  const [localValue, setLocalValue] = useState([0, 99999]);

  // Actualiza el valor cuando el slider cambia
  const handleSliderChange = (newValue) => {
    setLocalValue(newValue);
    if (onChange) {
      onChange({ target: { name: "rangoPrecio", value: newValue } }); // Trigger change correctly
    }
  };

  return (
    <div>
      <span className="d-flex justify-self-start ms-2">Rango de precio:</span>
      <div className="labels d-flex justify-content-between mb-2 px-2">
        <span>Min: {localValue[0]} ₡</span>
        <span>Max: {localValue[1]} ₡</span>
      </div>
      <div className="slider-container">
        <RangeSlider
          name="rangoPrecio"
          min={0}
          max={99999}
          value={localValue}
          onInput={handleSliderChange}
        />
      </div>
    </div>
  );
}