import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
export let MediaContext = createContext("");
export default function MediaContextProvider(props) {
  const [loading, setLoading] = useState(true);
  // const [Products, setProducts] = useState();
  const [category, setcategory] = useState();
  const [brands, setbrands] = useState();

  let getProduct = async (mediaType, func) => {
    let { data } = await axios.get(`${BaseUrl}/${mediaType}`);
    func(data.data);
    setLoading(false);
  };

  useEffect(() => {
    // getProduct("products", setProducts);
    getProduct("categories", setcategory);
    getProduct("brands", setbrands);
  }, []);

  return (
    <MediaContext.Provider
      value={{
        category,
        brands,
        loading,
        // getProduct,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}
