import React, { useContext } from "react";
import { MediaContext } from "../Context/MediaStore.jsx";
import Loading from "../Loading/Loading.jsx";

export default function Categories() {
  let { category } = useContext(MediaContext);

  return (
    <>
      <div className="container">
        {category ? (
          <div className=" row my-5 ">
            {category?.map((item) => {
              return (
                <div className="col-md-3 product pt-2   my-2" key={item._id}>
                  <img
                    src={item.image}
                    className="w-100 "
                    height={300}
                    alt=""
                  />
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
