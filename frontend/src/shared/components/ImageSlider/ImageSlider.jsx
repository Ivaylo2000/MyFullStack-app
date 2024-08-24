import React, { useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ images, handleImageClick, alt, cursorPointer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container">
      <button
        className="slider-button slider-button-left"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <div
        className="slider-image-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slider-image" key={index}>
            <img
              src={image}
              alt={alt}
              onClick={handleImageClick}
              style={{ cursor: cursorPointer ? "pointer" : "default" }}
            />
          </div>
        ))}
      </div>
      <button className="slider-button slider-button-right" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
