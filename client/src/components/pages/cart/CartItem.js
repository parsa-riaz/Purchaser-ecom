import React, { useEffect, useState } from "react";
import Star from "../../common/Start.js";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getSingleProduct } from "../../../redux/actions/productsAction";
import { useNavigate } from "react-router-dom";
import {
  deleteProductFromCart,
  updateCart,
} from "../../../redux/actions/cartAction.js";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { cart } = useSelector((state) => state.cart);

  const handleClick = (productId) => {
    dispatch(getSingleProduct(productId));
    navigate(`/single/${productId}`, { state: { id: productId } });
  };

  const handleIncrementQuantity = () => {
    const quantity = item.quantity + 1;
    handleUpdate(quantity);
  };

  const handleDecrementQuantity = () => {
    if (item.quantity - 1 <= 0) {
      setError("You should have at least  1 item of product");
    } else if (item.quantity - 1 > 0) {
      setError("");
      const quantity = item.quantity - 1;
      handleUpdate(quantity);
    }
  };
  const handleUpdate = async (quantity) => {
    dispatch(
      updateCart({ cartId: cart._id, productId: item.productId._id, quantity })
    );
  };
  const handleDelete = () => {
    dispatch(
      deleteProductFromCart({ cartId: cart._id, productId: item.productId._id })
    );
    // window.location.reload();
  };
  return (
    <div class="container mx-auto mt-2">
      {error ? (
        <div className="sticky text-red-600 text-end">* {error}</div>
      ) : null}
      <div class="flex my-5 border-b  ">
        <div class="w-full bg-white px-10 ">
          <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div
              class="flex w-full cursor-pointer"
              onClick={() => {
                handleClick(item.productId._id);
              }}
            >
              <div class="w-20">
                <img class="h-24" src={item.productId.image.url} alt="" />
              </div>
              <div class="flex flex-col justify-between ml-4 flex-grow">
                <span class="font-bold text-sm">{item.productId.title}</span>
                <span class="text-red-500 text-xs">
                  Rs. {item.productId.price}
                </span>
                <span>
                  {" "}
                  <Star rating={item.productId.avgRating} />{" "}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-x-1.5">
              <button
                type="button"
                class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={handleDecrementQuantity}
              >
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <input
                class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                type="number"
                min="1"
                value={item.quantity}
              />
              <button
                type="button"
                class="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={handleIncrementQuantity}
              >
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </div>

            <span class="text-center w-1/5 font-semibold text-sm">
              <p>Total</p>
              Rs. {item.productId.price * item.quantity}
            </span>
            <span
              onClick={handleDelete}
              class="text-center hover:text-cgreen cursor-pointer  text-gray-500 w-1/5 font-semibold text-sm"
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
