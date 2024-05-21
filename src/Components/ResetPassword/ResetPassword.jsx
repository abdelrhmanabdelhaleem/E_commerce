import React, { useContext, useState } from "react";
import imgforget from "../../images/fp-g.svg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Auth.jsx";
export default function ResetPassword() {
  let { saveUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 2500,
    });
  };
  let validationSchema = Yup.object({
    email: Yup.string().required().email(),
    newPassword: Yup.string()
      .required()
      .matches(/^[A-Z a-z 0-9]{3,15}$/, "Password Must Match The Pattern"),
  });

  const resetPasswordformik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put(`${BaseUrl}/auth/resetPassword`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            localStorage.setItem("token", data.data.token);
            saveUserData();
            notify("success", "success");
            navigate("/");
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
            <h4 className="mb-3 text-main ">Reset Password</h4>

            <form onSubmit={resetPasswordformik.handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                className="form-control my-3"
                onChange={resetPasswordformik.handleChange}
                onBlur={resetPasswordformik.handleBlur}
                value={resetPasswordformik.values.email}
                name="email"
                type="email"
              />
              {resetPasswordformik.errors.email &&
              resetPasswordformik.touched.email ? (
                <div className="alert alert-danger py-2">
                  {resetPasswordformik.errors.email}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="newPassword">New Password:</label>
              <input
                className="form-control my-3"
                name="newPassword"
                type="password"
                onChange={resetPasswordformik.handleChange}
                onBlur={resetPasswordformik.handleBlur}
                value={resetPasswordformik.values.newPassword}
              />
              {resetPasswordformik.errors.newPassword &&
              resetPasswordformik.touched.newPassword ? (
                <div className="alert alert-danger py-2">
                  {resetPasswordformik.errors.newPassword}
                </div>
              ) : (
                ""
              )}

              <div className=" py-2  d-flex justify-content-between align-items-center">
                <button
                  type="submit"
                  disabled={
                    !(
                      resetPasswordformik.isValid &&
                      resetPasswordformik.dirty &&
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
                    " Updata Password"
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
