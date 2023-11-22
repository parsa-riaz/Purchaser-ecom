import React from "react";
import { useSelector } from "react-redux";
import SingleOrder from "./SingleOrder";

export default function AllOrders() {
  const { orders } = useSelector((state) => state.orders);
  return (
    <div>
      {!orders || orders.length == 0 ? (
        <div className="text-center text-lg text-gray-400">No orders yet</div>
      ) : (
        <div >
          <SingleOrder orders={orders} />
        </div>
      )}
    </div>
  );
}
