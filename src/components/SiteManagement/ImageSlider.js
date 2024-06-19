import React, { useEffect } from "react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import "../../styles/SiteImg.css";

const ImageSlider = ({ images, current, nextSlide, prevSlide }) => {
  useEffect(() => {
    console.log("Images prop changed:", images);
  }, [images]);
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="imageSlider">
        <div className="no-images-message">이미지가 없습니다.</div>
      </div>
    );
  }
  return (
    <div className="imageSlider">
      <IoMdArrowDropleft
        className="imageSlider-arrow left"
        size="30"
        onClick={prevSlide}
      />
      <IoMdArrowDropright
        className="imageSlider-arrow right"
        size="30"
        onClick={nextSlide}
      />

      {images.map((img, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <img
              alt={`이미지 ${index + 1}`}
              src={img.imgUrl}
              className="homeimage"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
