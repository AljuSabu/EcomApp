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
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: { arrows: false },
      },
    ],
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
      <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-72">
        <Slider {...settings}>
          {slides.map((slide, i) => (
            <div key={i} className="relative">
              {/* Image */}
              <img
                src={slide.img}
                alt="slide"
                className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-72 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/5 flex items-center">
                <div className="px-5 sm:px-10 md:px-14 lg:px-20 text-white max-w-xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-200 mb-4 sm:mb-5 md:mb-6">
                    {slide.subtitle}
                  </p>

                  <Link to="products">
                    <button className="bg-white text-black px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base flex justify-center items-center font-semibold hover:bg-zinc-200 transition">
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
