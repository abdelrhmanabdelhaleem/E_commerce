import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="full-container h-100 position-relative">
        <Outlet />
      </div>
    </>
  );
}
