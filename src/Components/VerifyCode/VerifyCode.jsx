import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import imgforget from "../../images/fp-g.svg";

export default function VerifyCode() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 2500,
    });
  };
  let validationSchema = Yup.object({
    resetCode: Yup.string().required(),
  });

  const verifyCodeformik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${BaseUrl}/auth/verifyResetCode`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            notify("success", "success");
            navigate("/resetpassword");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 ">
            <p className="mb-3">
              <span className="text-main ">Forgot your password?</span> Please
              enter your code to reset your password.
            </p>

            <form onSubmit={verifyCodeformik.handleSubmit}>
              <label htmlFor="resetCode">Code:</label>
              <input
                className="form-control my-3"
                name="resetCode"
                type="text"
                onChange={verifyCodeformik.handleChange}
                onBlur={verifyCodeformik.handleBlur}
                value={verifyCodeformik.values.resetCode}
              />

              {verifyCodeformik.errors.resetCode &&
              verifyCodeformik.touched.resetCode ? (
                <div className="alert alert-danger py-2">
                  {verifyCodeformik.errors.resetCode}
                </div>
              ) : (
                ""
              )}
              <div className=" py-2  d-flex justify-content-between align-items-center">
                <button
                  disabled={
                    !(
                      verifyCodeformik.isValid &&
                      verifyCodeformik.dirty &&
                      !loading
                    )
                  }
                  type="submit"
                  className=" btn bg-main "
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    " Verify Code"
                  )}
                </button>
                <p className="mt-3">
                  Back To
                  <Link to="/login" className="text-main   ">
                    <span> Login</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center ">
            <img src={imgforget} className="w-75" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
