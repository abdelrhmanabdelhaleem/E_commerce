import React from "react";
import Slider from "react-slick";
import imgslider1 from "../../images/slider/slider-image-1.jpeg";
import imgslider2 from "../../images/slider/slider-image-2.jpeg";
import imgslider3 from "../../images/slider/slider-image-3.jpeg";
import imgslider4 from "../../images/slider/slider-2.jpeg";
import imgslider5 from "../../images/slider/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2300,
    arrows: false,
  };

  return (
    <>
      <Slider className="my-4 container " {...settings}>
        <div>
          <img src={imgslider1} className="w-100 " height={300} alt="" />
        </div>
        <div>
          <img src={imgslider2} className="w-100 " height={300} alt="" />
        </div>
        <div>
          <img src={imgslider3} className="w-100 " height={300} alt="" />
        </div>
        <div>
          <img src={imgslider4} className="w-100 " height={300} alt="" />
        </div>
        <div>
          <img src={imgslider5} className="w-100 " height={300} alt="" />
        </div>
      </Slider>
    </>
  );
}
