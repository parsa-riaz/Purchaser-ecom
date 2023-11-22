import React, { useEffect } from "react";
import logo from "../../../asserts/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function AdminDashboard() {
  const navigate = useNavigate();
  let { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="min-h-screen h-auto overflow-hidden bg-sky top-0 z-10 relative ">
      <div className="flex">
        <div className="w-[20%]  absolute bottom-0 top-0 bg-navy">
          <div className="bg-sky p-8 m-4">
            <img
              src={logo}
              class=" w-full h-full object-cover"
              alt="Flowbite Logo"
            />
          </div>
          <div className="grid justify-items-center align-middle text-gray-200 text-xl  test-start gap-4">
            <Link to="addAdmin">
              {" "}
              <p className="hover:text-cgreen cursor-pointer">Add Admin</p>
            </Link>
            <Link to="addProduct" className="">
              {" "}
              <p className="hover:text-cgreen cursor-pointer">Add Products</p>
            </Link>
            <Link to="adminProducts">
              {" "}
              <p className="hover:text-cgreen cursor-pointer">Products</p>
            </Link>
            <Link to="users">
              {" "}
              <p className="hover:text-cgreen cursor-pointer">Users</p>
            </Link>
            <Link to="adminOrders">
              {" "}
              <p className="hover:text-cgreen cursor-pointer">Orders</p>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
