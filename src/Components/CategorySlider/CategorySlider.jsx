import React, { useContext } from "react";
import Slider from "react-slick";
import { MediaContext } from "../Context/MediaStore.jsx";
import Loading from "../Loading/Loading.jsx";

export default function CategorySlider() {
  let { category } = useContext(MediaContext);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      <div className="container">
        {category ? (
          <div className="my-4 ">
            <h3 className="text-center pb-2">Shop Popular Categories</h3>
            <Slider {...settings}>
              {category?.map((item) => {
                return (
                  <div key={item._id}>
                    <img
                      src={item.image}
                      className="w-100 "
                      height={245}
                      alt=""
                    />

                    {/* <p className="text-center ">{item.name}</p> */}
                  </div>
                );
              })}
            </Slider>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
