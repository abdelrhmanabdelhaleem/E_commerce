import React, { useContext, useEffect } from "react";

import Loading from "./../Loading/Loading";
import { CartContext } from "../Context/CartContext.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

import imgcart from "../../../src/images/cart1.png";
export default function Cart() {
  let {
    loading,
    removeCartItem,
    getproductscart,
    removecart,
    countCart,
    productscart,
    updataCountitem,
  } = useContext(CartContext);

  useEffect(() => {
    if (countCart >= 1) {
      getproductscart();
    }
  }, []);

  return (
    <div className="container position-relative">
      <div>
        {productscart && countCart ? (
          <div>
            <div>
              <h2 className="text-center text-main pt-3 ">Shopping Cart</h2>
            </div>
            <div className="p-4  my-3 cart">
              <div className="d-flex justify-content-between  ">
                <div className="">
                  <h5 className="font-lg">Cart Items: {countCart}</h5>
                  <h5 className="font-lg">
                    total Cart Price: {productscart?.totalCartPrice} EGP
                  </h5>
                </div>
                <div>
                  <button onClick={removecart} className="btn btn-danger">
                    clear Cart
                  </button>
                </div>
              </div>
              <div>
                {productscart?.products?.map((item, index) => {
                  return (
                    <div key={item.product._id}>
                      <div className="row justify-content-between  ">
                        <div className="col-md-10 py-3 d-flex">
                          <div className="pe-2">
                            <img
                              height={165}
                              width={160}
                              src={item.product.imageCover}
                              alt=""
                            />
                          </div>
                          <div className="pt-3">
                            <h5 className="text-main">{item.product.title}</h5>
                            <h5 className="text-main pb-2  ">
                              price: {item.price}
                            </h5>
                            <Link
                              onClick={() => {
                                removeCartItem(item.product._id);
                              }}
                              className="text-danger"
                            >
                              <p>
                                <i className="fa-solid fa-trash font-sm"></i>{" "}
                                Remove
                              </p>
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center align-items-center ">
                          <p>
                            <button
                              className=" btn border-success font-sm px-2  "
                              onClick={() =>
                                updataCountitem(
                                  "plus",
                                  item.product._id,
                                  item.count
                                )
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <span className="text-main px-2 ">
                              {item.count}
                            </span>
                            <button
                              className="btn border-danger font-sm px-2 "
                              onClick={() =>
                                updataCountitem(
                                  "min",
                                  item.product._id,
                                  item.count
                                )
                              }
                              disabled={item.count === 1}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </p>
                        </div>
                        <hr />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                to="/cashorder"
                className="w-100 d-flex justify-content-center"
              >
                <button className="btn bg-main py-2 font-lg ">
                  Online Payment
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className=" my-5    ">
            <img className="w-100 " height={500} src={imgcart} alt="" />
          </div>
        )}
      </div>

      {loading && <Loading />}
    </div>
  );
}
