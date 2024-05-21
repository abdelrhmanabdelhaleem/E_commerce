import React from "react";
import imgallorder from "../../../src/images/Email-Messages-for-Order-Confirmation-Page-v3.webp";
import { Link } from "react-router-dom";
export default function AllOrder() {
  return (
    <div className="container">
      <div className=" w-100  my-5 py-4 ">
        <img className="w-100 px-4   " src={imgallorder} height={400} alt="" />
        <div className=" mt-4 text-center   ">
          <Link to="/" className=" btn btn-primary px-4 py-2   ">
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
