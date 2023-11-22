import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./components/pages/homepage/Home.js";
import Products from "./components/pages/products/Products.js";
import Login from "./components/pages/auth/Login.js";
import SignUp from "./components/pages/auth/SignUp.js";
import ForgetPass from "./components/pages/auth/ForgetPass.js";
import ChangePass from "./components/pages/auth/ChangePass.js";
import Footer from "./components/common/Footer.js";
import SingleProduct from "./components/pages/products/SingleProduct.js";
import { ToastContainer } from "react-toastify";
import Otp from "./components/pages/auth/Otp.js";
import CartHome from "./components/pages/cart/CartHome.js";

import Checkout from "./components/pages/checkout/Checkout.js";

import Cart from "./components/pages/cart/Cart.js";
import Order from "./components/pages/order/Order.js";
import SuccessOrder from "./components/pages/checkout/SuccessOrder.js";
import AllOrders from "./components/pages/order/AllOrders.js";
import PendingOrders from "./components/pages/order/PendingOrders.js";
import ShippedOrders from "./components/pages/order/ShippedOrders.js";
import DeliveredOrders from "./components/pages/order/DeliveredOrders.js";
import { useSelector } from "react-redux";
import PageNotFound from "./components/common/PageNotFound.js";
import Profile from "./components/pages/profile/Profile.js";
import EditProfile from "./components/pages/profile/EditProfile.js";
import ChangePasswordProfile from "./components/pages/profile/ChangePasswordProfile.js";
import AdminDashboard from "./components/pages/adminDashboard/AdminDashboard.js";

import AllProducts from "./components/pages/adminComponnet/AllProducts.js";
import Users from "./components/pages/adminComponnet/Users.js";
import AddProduct from "./components/pages/adminComponnet/AddProduct.js";
import AdminHeader from "./components/pages/adminComponnet/AdminHeader.js";
import AddAdmin from "./components/pages/adminComponnet/AddAdmin.js";
import Orders from "./components/pages/adminComponnet/Orders.js";

import SingleOrderAdmin from "./components/pages/adminComponnet/SingleOrderAdmin.js";

function App() {
  const { token, user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        {token && user.role == "admin" ? (
          <div>
            <AdminHeader />
          </div>
        ) : (
          <div>
            <Header />
          </div>
        )}

        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="single/:id" element={<SingleProduct />} />
          <Route path="adminDashboard" element={<AdminDashboard />}>
            <Route path="adminProducts" element={<AllProducts />} />
            <Route path="adminOrders" element={<Orders />} />
            <Route path="addAdmin" element={<AddAdmin />}></Route>
            <Route path="users" element={<Users />} />
            <Route path="addProduct" element={<AddProduct />} />
          </Route>
          <Route path="order/:id" element={<SingleOrderAdmin />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="forgetPassword" element={<ForgetPass />} />
          <Route path="otp" element={<Otp />} />
          <Route path="changePassword" element={<ChangePass />} />
          <Route path="cart" element={<CartHome />} />
          <Route path="cart/:id" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route
            path="/changePasswordProfile"
            element={<ChangePasswordProfile />}
          />
          <Route path="order" element={<Order />}>
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="pendingOrders" element={<PendingOrders />} />
            <Route path="shippedOrders" element={<ShippedOrders />} />
            <Route path="deliveredOrders" element={<DeliveredOrders />} />
          </Route>
          <Route path="ordersuccess" element={<SuccessOrder />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {token && user.role == "admin" ? (
          ""
        ) : (
          <div className="py-4">
            <Footer />
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
