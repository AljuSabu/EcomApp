import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToScroll: 1,
  };

  const images = ["/watch.jpg", "/shoe.jpg", "/eyewear.jpg", "/saree.jpg"];

  return (
    <>
      <div className="w-385 h-160">
        <Slider {...settings}>
          {images.map((img, i) => (
            <div key={i}>
              <img src={img} alt="img" className="h-160 w-full object-cover" />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
