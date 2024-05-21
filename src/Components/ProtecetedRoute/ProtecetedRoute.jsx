import React, { useContext } from "react";
import { AuthContext } from "../Context/Auth.jsx";
import { Navigate } from "react-router-dom";

export default function ProtecetedRoute({ children }) {
  let { user } = useContext(AuthContext);
  if (user == null && localStorage.getItem("token") == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
