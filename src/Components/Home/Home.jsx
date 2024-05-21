import React, { useContext } from "react";
import MainSlider from "../MainSlider/MainSlider.jsx";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";

import { MediaContext } from "../Context/MediaStore.jsx";
import Loading from "../Loading/Loading.jsx";
import ProductsList from "../ProductsList/ProductsList.jsx";

export default function Home() {
  let { category, brands } = useContext(MediaContext);

  return (
    <>
      {category && brands ? (
        <div>
          <MainSlider />
          <CategorySlider />
          <ProductsList />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
