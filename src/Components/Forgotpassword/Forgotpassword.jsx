import React, { useState } from "react";
import imgforget from "../../images/fp-g.svg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../Utils/BaseUrl.jsx";

export default function Forgotpassword() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 2500,
    });
  };
  let validationSchema = Yup.object({
    email: Yup.string().required().email(),
  });

  const forgotPasswordformik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${BaseUrl}/auth/forgotPasswords`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            notify(data.data.message, "success");
            navigate("/verifycode");
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
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
              enter the email associated with your account and We will email you
              a code to reset your password.
            </p>

            <form onSubmit={forgotPasswordformik.handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                onChange={forgotPasswordformik.handleChange}
                onBlur={forgotPasswordformik.handleBlur}
                value={forgotPasswordformik.values.email}
                className="form-control my-3"
                name="email"
                type="email"
              />
              {forgotPasswordformik.errors.email &&
              forgotPasswordformik.touched.email ? (
                <div className="alert alert-danger py-2">
                  {forgotPasswordformik.errors.email}
                </div>
              ) : (
                ""
              )}

              <div className=" py-2  d-flex justify-content-between align-items-center">
                <button
                  type="submit"
                  disabled={
                    !(
                      forgotPasswordformik.isValid &&
                      forgotPasswordformik.dirty &&
                      !loading
                    )
                  }
                  className=" btn bg-main "
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    "Send Code"
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
