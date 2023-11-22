import React from "react";
import logo from "../../asserts/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900  py-4">
      <div className=" w-full">
        <div className="grid grid-cols-1  gap-8 px-4 py-6 lg:py-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="bg-sky py-4">
              <img src={logo} alt="logo here" />
            </div>
            <p className="p-4 text-gray-300  text-lg 2xl:text-2xl text-start">
              Discover a world of quality products at your fingertips with
              Purchaser
            </p>
          </div>
          <div>
            <h2 className="mb-6 font-semibold text-orange-200  text-lg 2xl:text-2xl uppercase dark:text-white">
              Pages
            </h2>
            <ul className="text-gray-300 2xl:text-xl font-medium">
              <Link to="/">
                <li className="mb-4 hover:underline underline-offset-4 hover:text-orange-700">
                  Home
                </li>
              </Link>
              <Link to="/products">
                <li className="mb-4 hover:underline underline-offset-4 hover:text-orange-700">
                  Products
                </li>
              </Link>
              <Link to="/aboutus">
                <li className="mb-4 hover:underline underline-offset-4 hover:text-orange-700">
                  About us
                </li>
              </Link>
              <Link to="/contactus">
                <li className="mb-4 hover:underline underline-offset-4 hover:text-orange-700">
                  Contact us
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 font-semibold lg:text-2xl  text-orange-200 text-lg md:text-2xl uppercase dark:text-white">
              Account
            </h2>
            <ul className="text-gray-300 2xl:text-xl font-medium">
              <Link to="/login">
                <li className="mb-4 hover:underline underline-offset-4 hover:text-orange-700">
                  Login
                </li>
              </Link>
              <Link to="/signup">
                <li className="mb-4 hover:underline underline-offset-4 hover:text-orange-700">
                  Sign up
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col items-center ">
            <h2 className="mb-6 font-semibold uppercase text-orange-200 text-lg xl:text-xl">
              Where to find us?
            </h2>
            <ul className="text-gray-300 w-[65%] text-sm xl:text-lg  font-medium">
              <div className="hover:underline hover:text-orange-700 gap-2 flex">
                <i className="fa fa-phone-square" aria-hidden="true"></i>
                <li className="mb-4">0324 8765432</li>
              </div>
              <a
                href="https://mail.google.com/"
                className="flex gap-2 "
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-envelope-square" aria-hidden="true"></i>
                <li className="mb-4 hover:underline underline-offset-4 hover:text-orange-700">
                  purchasers@gmail.com
                </li>
              </a>
              <a
                href="https://www.facebook.com/"
                className="hover:underline flex gap-2 hover:text-orange-700"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
                <li className="mb-4">Purchasers</li>
              </a>
              <a
                href="https://www.instagram.com/"
                className="hover:underline flex gap-2 hover hover:text-orange-700"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-instagram"></i>
                <li className="mb-4">@purchaser</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 Purchaser. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
