import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { BaseUrl } from "../Utils/BaseUrl.jsx";

export let WishlistContext = createContext("");

export default function WishlistContextProvider(props) {
  // const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState();
  const [countwishlist, setcountwishlist] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getWishlist();
    }
  }, []);

  let addWishlist = async (productId) => {
    let { data } = await axios.post(
      `${BaseUrl}/wishlist`,
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setcountwishlist(data?.data.length);

    return data;
  };
  let getWishlist = async () => {
    let { data } = await axios.get(
      `${BaseUrl}/wishlist`,

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setWishlist(data.data);
    setcountwishlist(data?.count);

    return data;
  };
  let removeWishlist = async (productId) => {
    let { data } = await axios.delete(`${BaseUrl}/wishlist/${productId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setcountwishlist(data?.data.length);

    return data;
  };

  return (
    <WishlistContext.Provider
      value={{
        removeWishlist,
        addWishlist,
        getWishlist,
        wishlist,
        countwishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
