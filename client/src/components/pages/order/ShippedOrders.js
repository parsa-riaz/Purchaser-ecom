import React from "react";
import { useSelector } from "react-redux";
import SingleOrder from "./SingleOrder";

export default function ShippedOrders() {
  const { orders } = useSelector((state) => state.orders);
  const shippedOrders = orders.filter((order) => {
    return order.status == "Shipped";
  });
  return (
    <div>
      {shippedOrders.length == 0 ? (
        <div className="text-center text-lg text-gray-400">
          No product shipped yet
        </div>
      ) : (
        <SingleOrder orders={shippedOrders} />
      )}
    </div>
  );
}
