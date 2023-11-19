import {
  newOrder,
  getOrders,
  updateOneOrder,
  getUserOrders,
} from "../services/orderServices.js";
import Order from "../model/orderModel.js";
import { updateOne } from "../services/userServices.js";
export const createOrder = async (req, res) => {
  try {
    const {
      email,
      address,
      phone,
      city,
      province,
      userId,
      subtotal,
      shipping,
      total,
      items,
    } = req.body;
    console.log(req.body);
    let body = {
      address,
      city,
      province,
      phone,
    };
    let updateUser = await updateOne(userId, body);

    let order = await newOrder({ userId, items, shipping, subtotal, total });
    if (!order) return res.status(404).json({ message: "someting wrong" });
    res
      .status(200)
      .json({ message: "order placed succefully", orderId: order._id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    let update = await updateOneOrder(id, req.body);
    if (!update) return res.status(404).json({ message: "order not found" });
    const orders = await getOrders();
    res.status(200).json({ message: "status updated", orders: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    orders
      ? res.status(200).json({ orders })
      : res.status(404).json({ message: "No user found yet", orders: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate({
        path: "userId",
        select: "userName email phone address province city",
      })
      .populate({
        path: "items.productId",
        select: "title price quantity image", // Select the fields you want from the Product model
      })
      .exec();
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(`Fetching orders for user with ID: ${userId}`);

    const orders = await Order.find({ userId: userId })
      .populate({
        path: "userId",
        select: "email", // Select the fields you want from the User model
      })
      .populate({
        path: "items.productId",
        select: "title price quantity image", // Select the fields you want from the Product model
      })
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
