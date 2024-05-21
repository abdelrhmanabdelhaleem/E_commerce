import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import Loading from "../Loading/Loading.jsx";
import Slider from "react-slick";
import { CartContext } from "../Context/CartContext.jsx";

export default function ProductDetalis() {
  let { id } = useParams();
  const [product, setproduct] = useState();

  let { addCart, loading } = useContext(CartContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };

  let getDetalisproduct = async () => {
    let { data } = await axios.get(`${BaseUrl}/products/${id}`);
    setproduct(data.data);
  };

  useEffect(() => {
    getDetalisproduct();
  }, []);

  return (
    <>
      {product ? (
        <div key={product._id} className="container mt-5">
          <div className="row  justify-content-center align-items-center ">
            <div className="col-md-3 mt-5  ">
              <Slider className=" w-100  " {...settings}>
                {product.images.map((item) => {
                  return (
                    <div
                      className=" d-flex justify-content-center"
                      key={product._id}
                    >
                      <img
                        src={item}
                        className="text-center w-75"
                        height={300}
                        alt=""
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="col-md-9 mt-5 ">
              <h5>{product.description}</h5>
              <h5 className="my-4">{product.title}</h5>
              <h5 className=" text-primary  my-3 ">{product.brand.name}</h5>
              <h4 className="  text-main my-4  ">{product.category.name}</h4>

              <div className="d-flex my-4 justify-content-between">
                <div>
                  <span> {product.price} EGP</span>
                </div>
                <div>
                  <span>
                    {" "}
                    <i className="fa-solid fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  addCart(product._id);
                }}
                className="btn bg-main w-100 my-2  text-white"
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
