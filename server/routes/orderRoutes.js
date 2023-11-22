import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getAllUserOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderControllers.js";
import { isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";
router.post("/", createOrder);
router.get("/:userId", getAllUserOrders);
router.get("/", getAllOrders);
router.get("/single/:id", getSingleOrder);
router.put("/:id", updateOrder);
export default router;
