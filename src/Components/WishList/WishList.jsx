import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContext.jsx";
import { CartContext } from "../Context/CartContext.jsx";
import imgwishlist from "../../../src/images/empty_wishlist.png";

export default function WishList() {
  let { addCart, loading } = useContext(CartContext);
  let { getWishlist, countwishlist, removeWishlist } =
    useContext(WishlistContext);

  const [currentWishList, setCurrentWishList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (countwishlist >= 1) {
      getCurrentWishList();
    }
  }, []);

  const getCurrentWishList = async () => {
    setIsLoading(true);
    const data = await getWishlist();
    setIsLoading(false);
    setCurrentWishList(data.data);
  };

  const handleRemovewhishList = async (itemId) => {
    setIsLoading(true);
    const data = await removeWishlist(itemId);
    if (data.status === "success") {
      setCurrentWishList((prevWhishList) =>
        prevWhishList.filter((whishListitem) => whishListitem._id !== itemId)
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="">
        <div className="container">
          <div>
            {currentWishList && countwishlist ? (
              <div className="pt-4">
                <h2 className="text-center text-main ">FAVORITES</h2>
                <h5 className="text-center">
                  Find your saved items and get ready to order them
                </h5>

                <div className="row my-5">
                  {currentWishList.map((item) => {
                    return (
                      <div key={item._id} className="col-md-2 product my-3  ">
                        <i
                          onClick={() => {
                            handleRemovewhishList(item._id);
                          }}
                          className="text-danger  fa-solid fa-heart font-lg float-end p-2"
                        ></i>
                        <Link to={`/product-detalis/${item._id}`}>
                          <div className="p-1">
                            <img
                              src={item.imageCover}
                              className="w-100 "
                              alt=""
                            />

                            <h6 className=" text-center text-main mt-2  ">
                              {item.category.name}
                            </h6>
                            <p className="text-center">
                              {/* {item.title.split(" ").slice(0, 2).join(" ")} */}
                              <span> {item.price} EGP</span>
                            </p>
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
              </div>
            ) : (
              <div className=" my-5 py-5 d-flex justify-content-center align-items-center">
                <img
                  src={imgwishlist}
                  className="w-75 px-4"
                  height={300}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </>
  );
}
