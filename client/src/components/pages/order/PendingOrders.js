import React from "react";
import { useSelector } from "react-redux";
import SingleOrder from "./SingleOrder";

export default function PendingOrders() {
  const { orders } = useSelector((state) => state.orders);
  const pendingOrders = orders.filter((order) => {
    return order.status == "Pending";
  });
  return (
    <div>
      {pendingOrders.length == 0 ? (
        <div className="text-center text-lg text-gray-400">
          No pending products yet
        </div>
      ) : (
        <SingleOrder orders={pendingOrders} />
      )}
    </div>
  );
}
