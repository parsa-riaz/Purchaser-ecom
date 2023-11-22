import React, { useEffect, useState } from "react";
import {
  getAllOrdersAdmin,
  getSingleOrder,
  updateStatus,
} from "../../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function Orders() {
  const { token, user } = useSelector((state) => state.auth);
  const { loading, orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownItems = ["Pending", "Processing", "Shipped", "Delivered"];
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllOrdersAdmin({ token, user }));
  }, [dispatch]);

  const handleStatus = ({ status, id }) => {
    dispatch(updateStatus({ token, status, user, id }));
    dispatch(getAllOrdersAdmin({ token, user }));
  };

  return (
    <div className="flex justify-end text-center text-lg w-full min-h-screen h-full">
      <div className="bg-red-800 w-[80%] h-100 text-white">
        {loading ? (
          <Loading />
        ) : (
          <div className="bg-red-800  h-100 ">
            <div class="text-gray-900">
              <div class="p-4 flex">
                <h1 class="text-3xl">Orders</h1>
              </div>
              <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-white shadow-md rounded mb-4">
                  <thead>
                    <tr className="text-lg h-[4rem]">
                      <th>#ID</th>
                      <th>User ID</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="px-4">
                    {!orders ? (
                      <tr className="text-center text-xl w-full">
                        <div>Order not found</div>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b border text-lg gray-500 p-4 h-[4rem] text-center"
                        >
                          <td>{order._id}</td>
                          <td>{user._id}</td>
                          <td>{order.total}</td>
                          <td>{order.status}</td>
                          <td>
                            <div className="relative ">
                              <div class="relative flex-shrink-0 w-full">
                                <select
                                  className="mt-2 p-2 w-full rounded-lg shadow-md hover:border-orange"
                                  onChange={(e) => {
                                    setStatus(e.target.value);
                                    handleStatus({
                                      status: e.target.value,
                                      id: order._id,
                                    });
                                  }}
                                  // For making it a controlled component
                                >
                                  <option value={status}>{order.status}</option>

                                  {dropdownItems.map((option, index) => (
                                    <option
                                      className="box f_flex"
                                      key={index}
                                      value={option}
                                    >
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </td>
                          <td className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => {
                                let id = order._id;
                                navigate(`/order/${id}`);
                              }}
                              className="bg-navy text-white py-1 px-2 hover:bg-red-700"
                            >
                              View Order
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
