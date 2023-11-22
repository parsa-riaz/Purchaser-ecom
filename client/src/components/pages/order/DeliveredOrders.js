import React from "react";
import { useSelector } from "react-redux";
import SingleOrder from "./SingleOrder";

export default function DeliveredOrders() {
  const { orders } = useSelector((state) => state.orders);

  console.log("All Orders:", orders);

  const deliveredOrders = !orders
    ? []
    : orders.filter((order) => {
        return order.status === "Delivered";
      });

  console.log("Delivered Orders:", deliveredOrders);

  return (
    <div>
      {deliveredOrders.length == 0 ? (
        <div className="text-center text-lg text-gray-400">
          No product delivered yet
        </div>
      ) : (
        <SingleOrder orders={deliveredOrders} />
      )}
    </div>
  );
}
