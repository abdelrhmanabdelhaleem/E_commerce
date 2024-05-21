import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import { toast } from "react-toastify";

export let CartContext = createContext("");

export default function CartContextProvider(props) {
  const [loading, setLoading] = useState(false);
  const [countCart, setcountCart] = useState();
  const [productscart, setproductscart] = useState();
  const [cartId, setcartId] = useState(null);

  const notify = (msg, type) => {
    toast[type](msg, {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token") && countCart >= 1) {
      getproductscart();
    }
  }, []);

  let addCart = async (productId) => {
    setLoading(true);
    await axios
      .post(
        `${BaseUrl}/cart`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setcountCart(data.numOfCartItems);
        notify(data.message, "success");
        setLoading(false);
      })
      .catch((error) => {
        notify(error.message, "error");
        setLoading(false);
      });
  };
  let getproductscart = async () => {
    setLoading(true);
    await axios
      .get(
        `${BaseUrl}/cart`,

        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setproductscart(data.data);
        setcountCart(data?.numOfCartItems);
        setcartId(data?.data._id);
        setLoading(false);
      })
      .catch((error) => {
        // need back end refactor in case of empty card
        setproductscart([]);
        setcountCart(0);
        setLoading(false);
      });
  };
  let removeCartItem = async (productId) => {
    setLoading(true);
    await axios
      .delete(`${BaseUrl}/cart/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setproductscart(data.data);
        setcountCart(data?.numOfCartItems);
        notify("success Remove Item In Cart", "success");
      })
      .catch((error) => {
        notify(error.message, "error");
        setLoading(false);
      });
  };

  let removecart = async () => {
    setLoading(true);
    await axios
      .delete(
        `${BaseUrl}/cart`,

        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        setproductscart([]);
        setcountCart(0);
        notify("success Remove Cart", "success");
        setLoading(false);
      })
      .catch((error) => {
        notify("error Remove Cart", "error");
        setLoading(false);
      });
  };
  const updataCountitem = async (operation, id, count) => {
    const newCount = operation === "plus" ? count + 1 : count - 1;
    setLoading(true);
    await axios
      .put(
        `${BaseUrl}/cart/${id}`,
        { count: newCount },

        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setproductscart(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  let onlinePayment = async (values) => {
    setLoading(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-eight-sooty.vercel.app`,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        setLoading(false);
        window.location.href = data.data.session.url;
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <CartContext.Provider
      value={{
        addCart,
        getproductscart,
        countCart,
        productscart,
        removecart,
        removeCartItem,
        loading,
        updataCountitem,
        cartId,
        onlinePayment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
