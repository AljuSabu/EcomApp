import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

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

  const slides = [
    {
      img: "/watch.jpg",
      title: "Timeless Watches",
      subtitle: "Luxury that defines you",
    },
    {
      img: "/shoe.jpg",
      title: "Step in Style",
      subtitle: "Comfort meets design",
    },
    {
      img: "/eyewear.jpg",
      title: "See the Difference",
      subtitle: "Clarity with attitude",
    },
    {
      img: "/saree.jpg",
      title: "Elegant Sarees",
      subtitle: "Tradition reimagined",
    },
  ];
  return (
    <>
      <div className="w-full h-[70vh]">
        <Slider {...settings}>
          {slides.map((slide, i) => (
            <div key={i} className="relative">
              {/* Image */}
              <img
                src={slide.img}
                alt="slide"
                className="w-full h-[70vh] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 flex items-center">
                <div className="px-10 md:px-20 text-white max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-lg md:text-xl text-zinc-200 mb-6">
                    {slide.subtitle}
                  </p>

                  <Link to="products">
                    <button className="bg-white text-black px-6 py-3 flex justify-center items-center font-semibold hover:bg-zinc-200 transition">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
