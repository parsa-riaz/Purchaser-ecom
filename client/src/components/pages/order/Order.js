import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import { getAllOrders } from "../../../redux/actions/orderActions";
import { getUser } from "../../../redux/actions/authAction";

export default function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.orders);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      getUser({ id: user._id, token });
    }
    dispatch(getAllOrders({ userId: user._id }));
  }, []);
  return (
    <div className="text-center  mt-[5rem]">
      <div className="text-xl md:text- text-navy font-lora font-semibold">
        <p>My Orders</p>
      </div>
      {loading ? (
        <Loading />
      ) : !orders || orders.length == 0 ? (
        <div className="text-center text-gray-400 ">No orders found yet</div>
      ) : (
        <div className="border-b-2 text-sm md:text-base flex-wrap text-navy gap-4 uppercase flex font-playpan font-semibold  py-4 text-center justify-evenly">
          <p
            onClick={() => navigate("allOrders")}
            className="underline underline-offset-4 hover:text-cgreen cursor-pointer"
          >
            All Orders
          </p>
          <p
            onClick={() => navigate("pendingOrders")}
            className="underline underline-offset-4 hover:text-cgreen cursor-pointer"
          >
            Pending
          </p>
          <p
            onClick={() => navigate("shippedOrders")}
            className="underline underline-offset-4 hover:text-cgreen cursor-pointer"
          >
            Shipped
          </p>
          <p
            onClick={() => navigate("deliveredOrders")}
            className="underline underline-offset-4 hover:text-cgreen cursor-pointer"
          >
            Delivered
          </p>
        </div>
      )}

      <Outlet />
    </div>
  );
}
