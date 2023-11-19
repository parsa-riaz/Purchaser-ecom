import Order from "../model/orderModel.js";

export const newOrder = async ({
  userId,
  items,
  shipping,
  subtotal,
  total,
}) => {
  console.log(userId, items, shipping, subtotal, total);
  let order = new Order({
    userId: userId,
    items: items,
    total: total,
    shipping: shipping,
    subtotal: subtotal,
  });
  await order.save();
  return order;
};

export const getOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

export const updateOneOrder = async (id, body) => {
  return await Order.findByIdAndUpdate(id, body, { new: true });
};

export const getUserOrders = async (userId) => {
  return await Order.find({ userId: userId })
    .populate("userId", "items.productId")
    .exec();
};
