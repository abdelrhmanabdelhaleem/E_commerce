import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgSignup from "../../images/signup-g.svg";
import axios from "axios";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Register() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 2500,
    });
  };
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3).max(30),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^[A-Z a-z 0-9]{6,15}$/, "Password Must Match The Pattern"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Password And Repassword Not Match "),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "accept only egypt phone numbers"),
  });

  const registerformik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${BaseUrl}/auth/signup`, values)
        .then((data) => {
          if (data.status === 201) {
            setLoading(false);
            notify("success", "success");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  return (
    <>
      <div className="container">
        <div className="row  mt-5">
          <div className="col-md-6 ">
            <h4 className="text-main">Register Form to FreshCart</h4>
            <form onSubmit={registerformik.handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
                value={registerformik.values.name}
                className="form-control my-2"
                name="name"
                type="text"
              />
              {registerformik.errors.name && registerformik.touched.name ? (
                <div className="alert alert-danger py-2">
                  {registerformik.errors.name}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="email">Email:</label>
              <input
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
                value={registerformik.values.email}
                className="form-control my-2"
                name="email"
                type="email"
              />
              {registerformik.errors.email && registerformik.touched.email ? (
                <div className="alert alert-danger py-2">
                  {registerformik.errors.email}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="password">Password:</label>
              <input
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
                value={registerformik.values.password}
                className="form-control my-2"
                name="password"
                type="password"
              />
              {registerformik.errors.password &&
              registerformik.touched.password ? (
                <div className="alert alert-danger py-2">
                  {registerformik.errors.password}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="rePassword">Repassword:</label>
              <input
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
                value={registerformik.values.rePassword}
                className="form-control my-2"
                name="rePassword"
                type="password"
              />
              {registerformik.errors.rePassword &&
              registerformik.touched.rePassword ? (
                <div className="alert alert-danger py-2">
                  {registerformik.errors.rePassword}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="name">phone:</label>
              <input
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
                value={registerformik.values.phone}
                className="form-control my-2"
                name="phone"
                type="text"
              />
              {registerformik.errors.phone && registerformik.touched.phone ? (
                <div className="alert alert-danger py-2">
                  {registerformik.errors.phone}
                </div>
              ) : (
                ""
              )}
              <div className=" pt-2 d-flex justify-content-between align-items-center">
                <button
                  disabled={!(registerformik.isValid && registerformik.dirty)}
                  type="submit"
                  className=" btn bg-main "
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    "Register"
                  )}
                </button>
                <p className="mt-3 ps-3">
                  Already have an account?{" "}
                  <Link to="/login" className="text-main">
                    <span>Sign In</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center ">
            <img src={imgSignup} className="w-75" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
