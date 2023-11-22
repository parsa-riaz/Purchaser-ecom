import express from "express";
import { isLogin } from "../middleware/isLogin.js";
const router = express.Router();

import {
  addToCart,
  deleteFromCart,
  getCartItems,
  updatingCart,
} from "../controllers/cartControllers.js";
router.get("/:userId", getCartItems);
router.post("/", addToCart);
router.delete("/:cartId/:productId", deleteFromCart);
router.put("/:cartId", updatingCart);

export default router;
