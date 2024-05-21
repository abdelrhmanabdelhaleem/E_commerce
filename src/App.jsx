import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import ProductDetalis from "./Components/ProductDetalis/ProductDetalis.jsx";
import ProductsList from "./Components/ProductsList/ProductsList.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ChangePassword from "./Components/ChangePassword/ChangePassword.jsx";
import VerifyCode from "./Components/VerifyCode/VerifyCode.jsx";
import ProtecetedRoute from "./Components/ProtecetedRoute/ProtecetedRoute";
import InverseProtecetedRoute from "./Components/InverseProtecetedRoute/InverseProtecetedRoute.jsx";
import { ToastContainer } from "react-toastify";
import CashOrder from "./Components/CashOrder/CashOrder";

// import { Online } from "react-detect-offline";

import AllOrder from "./Components/AllOrder/AllOrder.jsx";
function App() {
  let Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,

          element: (
            <ProtecetedRoute>
              <Home />
            </ProtecetedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtecetedRoute>
              <ProductsList />
            </ProtecetedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtecetedRoute>
              <Categories />
            </ProtecetedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtecetedRoute>
              <Brands />
            </ProtecetedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtecetedRoute>
              <Cart />
            </ProtecetedRoute>
          ),
        },
        {
          path: "cashorder",
          element: (
            <ProtecetedRoute>
              <CashOrder />
            </ProtecetedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtecetedRoute>
              <AllOrder />
            </ProtecetedRoute>
          ),
        },

        {
          path: "product-detalis/:id",
          element: (
            <ProtecetedRoute>
              <ProductDetalis />
            </ProtecetedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtecetedRoute>
              <WishList />
            </ProtecetedRoute>
          ),
        },
        {
          path: "changepassword",
          element: (
            <ProtecetedRoute>
              <ChangePassword />
            </ProtecetedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <InverseProtecetedRoute>
              <Login />
            </InverseProtecetedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <InverseProtecetedRoute>
              <Register />
            </InverseProtecetedRoute>
          ),
        },
        {
          path: "Forgetpassword",
          element: (
            <InverseProtecetedRoute>
              <Forgotpassword />
            </InverseProtecetedRoute>
          ),
        },
        {
          path: "verifycode",
          element: (
            <InverseProtecetedRoute>
              <VerifyCode />
            </InverseProtecetedRoute>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <InverseProtecetedRoute>
              <ResetPassword />
            </InverseProtecetedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <>
        <ToastContainer theme="colored" />
        <RouterProvider router={Routes} />
      </>
      {/* <Offline>
        <div className=" vh-100  d-flex justify-content-center align-items-center">
          <img className=" w-75 " src={offlineimg} alt="" />
        </div>
      </Offline> */}
    </>
  );
}

export default App;
