import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { daleteUser, getUser } from "../../../redux/actions/authAction";

export default function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      getUser({ id: user._id, token });
    }
  }, []);
  return (
    <div className="w-full h-auto flex  items-center  justify-center mt-[8rem]">
      <div class="rounded-xl border w-[80%] lg:w-[60%]  bg-cgreen p-4">
        {!user ? (
          <div className="text-white text-lg text-center">
            Something went wrong
          </div>
        ) : (
          <div class="flex flex-col items-center gap-4">
            <div className="rounded-full  text-navy uppercase font-bold text-4xl bg-sky  px-[2.5rem] py-[2rem]">
              {user != null ? user.userName[0] : null}
            </div>

            <div>
              <h3 class="text-2xl font-medium text-white">{user.userName}</h3>
            </div>
            <div className="border-t text-white  w-[80%]  flex flex-col justify-center  items-center border-white  p-4">
              <div className="flex justify-between py-2 w-full">
                <p className="w-1/2">email: </p>
                <p className="w-1/2">{user.email} </p>
              </div>
              <div className="flex justify-between w-full ">
                <p className="w-1/2">phone no#: </p>
                <p className="w-1/2">{user.phone} </p>
              </div>
              <div className="flex justify-between  py-2 w-full text-start">
                <p className="w-1/2">address:</p>
                <p className="w-1/2"> {user.address} </p>
              </div>
              <div className="flex justify-between w-full text-start">
                <p className="w-1/2">province: </p>
                <p className="w-1/2">{user.province} </p>
              </div>
              <div className="flex justify-between w-full  py-2 text-start">
                <p className="w-1/2">city:</p>
                <p className="w-1/2"> {user.city} </p>
              </div>
            </div>
            <div className="border-t flex flex-col w-[80%] gap-4 justify-center items-center border-white  py-4">
              <Link to="/editprofile">
                {" "}
                <button className="bg-navy w-[10rem] p-2 hover:bg-sky hover:text-black text-white rounded-sm ">
                  Edit profile
                </button>
              </Link>
              <Link to="/changePasswordProfile">
                <button className="bg-navy p-2 w-[10rem] hover:bg-sky hover:text-black text-white rounded-sm">
                  Change Password
                </button>
              </Link>
              <button
                onClick={() => {
                  dispatch(daleteUser({ id: user._id, token }));
                  navigate("/login");
                }}
                className="bg-navy p-2 w-[10rem] hover:bg-sky hover:text-black text-white rounded-sm"
              >
                Delete account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
