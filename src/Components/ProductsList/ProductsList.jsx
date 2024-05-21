import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContext.jsx";
import { CartContext } from "../Context/CartContext.jsx";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductsList() {
  let { addCart, loading } = useContext(CartContext);
  let { getWishlist, addWishlist, removeWishlist, wishlist } =
    useContext(WishlistContext);
  const [currentWishList, setCurrentWishList] = useState([]);

  const [Products, setProducts] = useState();
  const [productsLoading, setProductsLoading] = useState(false);
  const notify = (msg, type) => {
    toast[type](msg, {
      position: "bottom-center",
      autoClose: 2000,
    });
  };
  const checkHeartExists = (id) => {
    return currentWishList?.length && currentWishList?.includes(id);
  };

  useEffect(() => {
    setCurrentWishList(() => wishlist?.map((item) => item.id));
  }, [wishlist]);

  const handleWhistList = async (itemId) => {
    const isExist = checkHeartExists(itemId);
    if (isExist) {
      setCurrentWishList((prevSelectedHeart) =>
        prevSelectedHeart?.filter((selectedId) => selectedId !== itemId)
      );
      notify("Product removed successfully to your wishlist", "success");
      const data = await removeWishlist(itemId);
      if (data?.status === "success") {
        setCurrentWishList(data.data);
      }
    } else {
      setCurrentWishList((prevSelectedHeart) => [...prevSelectedHeart, itemId]);

      notify("Product added successfully to your wishlist", "success");
      const data = await addWishlist(itemId);
      if (data?.status === "success") {
        setCurrentWishList(data.data);
      }
    }
  };
  useEffect(() => {
    getProducts("");
    getWishlist();
  }, []);
  let getProducts = async (Type) => {
    setProductsLoading(true);
    let { data } = await axios.get(`${BaseUrl}/products?sort=${Type}`);
    if (data) {
      setProductsLoading(false);
      setProducts(data.data);
    }
  };

  return (
    <>
      <div className="container">
        <div className="dropdown mt-3 text-end ">
          <button
            className="btn btn-danger dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort Products
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link
                onClick={() => {
                  getProducts("-price");
                }}
                className="dropdown-item text-danger"
                href="#"
              >
                High Price <i className="fa-solid fa-up-long"></i>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  getProducts("price");
                }}
                className="dropdown-item text-danger"
                href="#"
              >
                Low Price <i className="fa-solid fa-down-long ps-1"></i>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="row  my-5">
            {Products &&
              Products?.map((item) => {
                return (
                  <div key={item._id} className="col-md-2 product my-4  ">
                    <i
                      onClick={() => {
                        handleWhistList(item._id);
                      }}
                      className={` fa-heart font-lg float-end p-2 ${
                        checkHeartExists(item._id)
                          ? "text-danger  fa-solid"
                          : "fa-regular"
                      }`}
                    ></i>
                    <Link to={`/product-detalis/${item._id}`}>
                      <div className="p-1">
                        <img src={item.imageCover} className="w-100  " alt="" />

                        <h6 className=" text-center text-main mt-2  ">
                          {" "}
                          {item.category.name}
                        </h6>
                        <p className="text-center">
                          {item.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <div className="d-flex mb-1 justify-content-between">
                          <div>
                            <span> {item.price} EGP</span>
                          </div>
                          <div>
                            <span>
                              {" "}
                              <i className="fa-solid fa-star rating-color"></i>{" "}
                              {item.ratingsAverage}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        addCart(item._id);
                      }}
                      className="btn bg-main mb-2 w-100 text-white"
                    >
                      {" "}
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
                );
              })}
          </div>
          {productsLoading && <Loading />}
        </div>
      </div>
    </>
  );
}
