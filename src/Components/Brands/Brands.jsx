import React, { useContext } from "react";
import { MediaContext } from "../Context/MediaStore.jsx";
import Loading from "../Loading/Loading.jsx";

export default function Brands() {
  let { brands } = useContext(MediaContext);

  return (
    <>
      <div className="container">
        {brands ? (
          <div className=" row my-5 ">
            {brands?.map((item) => {
              return (
                <div key={item._id} className="col-md-3 product  my-2">
                  <img src={item.image} className="w-100 " alt="" />
                  <p className="text-center text-main">{item.name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
