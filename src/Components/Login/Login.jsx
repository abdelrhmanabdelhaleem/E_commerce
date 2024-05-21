import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgSignin from "../../images/signin-g.svg";
import axios from "axios";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Auth.jsx";

export default function Login() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { saveUserData } = useContext(AuthContext);
  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 2500,
    });
  };
  let validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^[A-Z a-z 0-9]{3,15}$/, "Password Must Match The Pattern"),
  });

  const loginformik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${BaseUrl}/auth/signin`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            localStorage.setItem("token", data.data.token);
            saveUserData();
            notify("success", "success");
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 ">
            <h4 className="text-main mb-3">Login Form to FreshCart</h4>

            <form onSubmit={loginformik.handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                onChange={loginformik.handleChange}
                onBlur={loginformik.handleBlur}
                value={loginformik.values.email}
                className="form-control my-2"
                name="email"
                type="email"
              />
              {loginformik.errors.email && loginformik.touched.email ? (
                <div className="alert alert-danger py-2">
                  {loginformik.errors.email}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="password">Password:</label>
              <input
                onChange={loginformik.handleChange}
                onBlur={loginformik.handleBlur}
                value={loginformik.values.password}
                className="form-control my-2"
                name="password"
                type="password"
              />
              {loginformik.errors.password && loginformik.touched.password ? (
                <div className="alert alert-danger py-2">
                  {loginformik.errors.password}
                </div>
              ) : (
                ""
              )}
              <p className="">
                Forgot password?{" "}
                <Link to="/Forgetpassword" className="text-main">
                  <span> Reset It</span>
                </Link>
              </p>

              <div className=" d-flex justify-content-between align-items-center">
                <button
                  disabled={!(loginformik.isValid && loginformik.dirty)}
                  type="submit"
                  className=" btn bg-main "
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="mt-3 ps-3">
                  Don’t have an account?
                  <Link to="/register" className="text-main">
                    <span> Sign UP </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center ">
            <img src={imgSignin} className="w-75" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
