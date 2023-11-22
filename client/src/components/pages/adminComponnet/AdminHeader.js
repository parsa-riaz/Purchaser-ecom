import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../redux/reducers/authSlice";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <nav class="bg-white  w-full border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class=" w-full flex justify-between items-center   p-4">
        <div class="justify-end flex w-full">
          <Link to="/adminDashboard">
            {" "}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                dispatch(logOutUser());
              }}
              type="button"
              className=" hover:bg-navy 2xl:text-2xl hover:text-white font-medium rounded-0 text-sm md:px-4 md:py-2 text-center mr-3 md:mr-0 "
            >
              Dashboard
            </button>
          </Link>
          <Link to="/">
            {" "}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                dispatch(logOutUser());
              }}
              type="button"
              className=" hover:bg-navy 2xl:text-2xl hover:text-white font-medium rounded-0 text-sm md:px-4 md:py-2 text-center mr-3 md:mr-0 "
            >
              Log Out
            </button>
          </Link>
          <Link to="/profile">
            {" "}
            <div className="rounded-full bg-zinc uppercase font-bold text-lg hover:text-zinc text-white hover:bg-sky px-2 mx-1 md:mx-0 py-1 md:px-3 md:py-2">
              {user != null ? user.userName[0] : null}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
