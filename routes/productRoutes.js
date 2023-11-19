import express from "express";
const router = express.Router();

import {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  addRatingAndReview,
  filterByRating,
  filterByCategory,
  searchProduct,
} from "../controllers/productControllers.js";
import { isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";

router.get("/", getAllProducts);
router.get("/rating", filterByRating);
router.get("/category", filterByCategory);
router.get("/search", searchProduct);
router.get("/:id", getSingleProduct);

router.post("/review", addRatingAndReview);
router.post("/create", [isLogin, isAdmin], addProduct);
router.put("/:id", updateProduct);

router.delete("/:id", isLogin, deleteProduct);

export default router;
