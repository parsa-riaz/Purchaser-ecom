import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SuccessOrder() {
  const { orderId } = useSelector((state) => state.cart);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative h-screen top-0 flex justify-center items-center bg-gray-800/20 z-10">
      <div className=" h-auto w-full md:h-[60%] md:w-[40%] bg-white p-4 text-center font-lora">
        <FontAwesomeIcon
          className="text-green-700 text-[4rem]"
          icon={faCheckSquare}
        />
        <div className="">
          <div className="flex col justify-center gap-2">
            <p>Tracking number:</p>
            <p className="text-red-600 font-semibold">#{orderId}</p>
          </div>
          <h3 className="text-cgreen py-4 text-2xl md:text-3xl lg:text-4xl font-neon">
            Thank you for ordering
          </h3>
          <p className="p-4">
            We appreciate your order, we’re currently processing it. So hang
            tight and we’ll send you confirmation very soon!
          </p>
          <div className="flex justify-center gap-2">
            <p>Delivery time:</p>
            <p className="text-red-600">3 - 7 days</p>
          </div>
          <Link to="/products">
            {" "}
            <button className="bg-navy text-white hover:bg-cgreen my-2 p-2">
              Continue Shopping
            </button>
          </Link>
          <Link to="/order">
            <p className="underline underline-offset-4 text-navy hover:text-cgreen font-semibold">
              {" "}
              View Order detail
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
