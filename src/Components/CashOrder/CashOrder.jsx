import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { CartContext } from "../Context/CartContext.jsx";

export default function CashOrder() {
  const { onlinePayment, loading } = useContext(CartContext);
  let validationSchema = Yup.object({
    details: Yup.string().required().min(3).max(30),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "accept only egypt phone numbers"),
    city: Yup.string().required().min(3).max(30),
  });
  const cashOrderformik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onlinePayment(values);
    },
  });

  return (
    <>
      <div className="container">
        <div className="my-5 w-75 m-auto">
          <form onSubmit={cashOrderformik.handleSubmit}>
            <label htmlFor="details">Details:</label>
            <input
              onChange={cashOrderformik.handleChange}
              onBlur={cashOrderformik.handleBlur}
              value={cashOrderformik.values.details}
              className="form-control my-2"
              name="details"
              type="text"
            />
            {cashOrderformik.errors.details &&
            cashOrderformik.touched.details ? (
              <div className="alert alert-danger py-2">
                {cashOrderformik.errors.details}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="phone">phone:</label>
            <input
              onChange={cashOrderformik.handleChange}
              onBlur={cashOrderformik.handleBlur}
              value={cashOrderformik.values.phone}
              className="form-control my-2"
              name="phone"
              type="text"
            />
            {cashOrderformik.errors.phone && cashOrderformik.touched.phone ? (
              <div className="alert alert-danger py-2">
                {cashOrderformik.errors.phone}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="city">City:</label>
            <input
              onChange={cashOrderformik.handleChange}
              onBlur={cashOrderformik.handleBlur}
              value={cashOrderformik.values.city}
              className="form-control my-2"
              name="city"
              type="text"
            />
            {cashOrderformik.errors.city && cashOrderformik.touched.city ? (
              <div className="alert alert-danger py-2">
                {cashOrderformik.errors.city}
              </div>
            ) : (
              ""
            )}
            <div className=" pt-2 d-flex justify-content-between align-items-center">
              <button
                disabled={!(cashOrderformik.isValid && cashOrderformik.dirty)}
                type="submit"
                className=" btn bg-main "
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
