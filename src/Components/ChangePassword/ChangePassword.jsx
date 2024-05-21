import React, { useContext, useState } from "react";
import imgchgpassword from "../../images/reset-password.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../Utils/BaseUrl.jsx";
import { AuthContext } from "../Context/Auth.jsx";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  let { logOut } = useContext(AuthContext);
  const notify = (msg, type) => {
    toast[type](msg, {
      autoClose: 2500,
    });
  };
  let validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required()
      .matches(/^[A-Z a-z 0-9]{3,15}$/, "Password Must Match The Pattern"),
    password: Yup.string()
      .required()
      .matches(/^[A-Z a-z 0-9]{3,15}$/, "Password Must Match The Pattern"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Password And Repassword Not Match "),
  });
  const formikChangePassword = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put(`${BaseUrl}/users/changeMyPassword`, values, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            notify("success", "success");
            logOut();
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setLoading(false);
            notify(error.response.data.errors.msg, "error");
          }
        });
    },
  });
  return (
    <div>
      <div className="container">
        <div className="row  mt-4 flex-column justify-content-center align-items-center   ">
          <div className="col-md-6 text-center  ">
            {" "}
            <img
              src={imgchgpassword}
              height={300}
              className="w-75 m-auto "
              alt=""
            />
          </div>
          <div className="col-md-6 ">
            <form onSubmit={formikChangePassword.handleSubmit}>
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                className="form-control my-2"
                name="currentPassword"
                type="password"
                onChange={formikChangePassword.handleChange}
                onBlur={formikChangePassword.handleBlur}
                value={formikChangePassword.values.currentPassword}
              />
              {formikChangePassword.errors.currentPassword &&
              formikChangePassword.touched.currentPassword ? (
                <div className="alert alert-danger py-2">
                  {formikChangePassword.errors.currentPassword}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="password">New Password:</label>
              <input
                className="form-control my-2"
                name="password"
                type="password"
                onChange={formikChangePassword.handleChange}
                onBlur={formikChangePassword.handleBlur}
                value={formikChangePassword.values.password}
              />
              {formikChangePassword.errors.password &&
              formikChangePassword.touched.password ? (
                <div className="alert alert-danger py-2">
                  {formikChangePassword.errors.password}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="rePassword">Repassword:</label>
              <input
                className="form-control my-2"
                name="rePassword"
                type="password"
                onChange={formikChangePassword.handleChange}
                onBlur={formikChangePassword.handleBlur}
                value={formikChangePassword.values.rePassword}
              />
              {formikChangePassword.errors.rePassword &&
              formikChangePassword.touched.rePassword ? (
                <div className="alert alert-danger py-2">
                  {formikChangePassword.errors.rePassword}
                </div>
              ) : (
                ""
              )}

              <div className=" pt-2 w-100 m-auto text-center ">
                <button
                  disabled={
                    !(
                      formikChangePassword.isValid &&
                      formikChangePassword.dirty &&
                      !loading
                    )
                  }
                  type="submit"
                  className=" btn bg-main   "
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    "Save Change"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
