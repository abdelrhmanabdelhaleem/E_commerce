import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { AuthContext } from "../Context/Auth.jsx";
import { WishlistContext } from "../Context/WishlistContext.jsx";
import { CartContext } from "../Context/CartContext.jsx";

export default function Navbar() {
  let { logOut, user } = useContext(AuthContext);
  let { countCart } = useContext(CartContext);
  let { countwishlist } = useContext(WishlistContext);

  const [currentCountWishlist, setcurrentCountWishlist] = useState(0);
  const [currentCountCart, setcurrentCountCart] = useState(0);
  useEffect(() => {
    setcurrentCountWishlist(countwishlist);
  }, [countwishlist]);
  useEffect(() => {
    setcurrentCountCart(countCart);
  }, [countCart]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light navbar-light ">
        <div className="container">
          <Link to="" className="navbar-brand">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse my-2 "
            id="navbarSupportedContent"
          >
            {user ? (
              <ul className="navbar-nav me-auto  mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto my-2   mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => {
                        console.log("dddd");
                      }}
                    >
                      <i className="fa-solid fa-user font-lg  text-main"></i>
                    </Link>
                    <ul className="dropdown-menu" data-bs-display="static">
                      <li>
                        <Link
                          className="dropdown-item text-success "
                          to="changepassword"
                        >
                          Change Password {""}
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={logOut}
                          to="login"
                          className="dropdown-item text-danger"
                        >
                          LogOut {""}
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="wishlist"
                      className="btn me-1 border-0  position-relative"
                    >
                      WishList <i className="fa-solid fa-heart text-danger"></i>
                      <span className=" position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                        {currentCountWishlist ? currentCountWishlist : 0}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="cart"
                      className="btn me-1  border-0  position-relative"
                    >
                      Cart{" "}
                      <i className="fa-solid fa-cart-shopping text-primary"></i>
                      <span className=" position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                        {currentCountCart ? currentCountCart : 0}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
