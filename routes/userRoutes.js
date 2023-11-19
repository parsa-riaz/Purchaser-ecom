import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getSingleUser,
  registerUser,
  updateUser,
  loginUser,
  resetPassword,
  forgetPassword,
  verifyOtp,
  deleteUser,
} from "../controllers/userControllers.js";
import { isLogin } from "../middleware/isLogin.js";
import { isAdmin } from "../middleware/isAdmin.js";

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/sign-up", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", isLogin, deleteUser);
router.post("/login", loginUser);
router.post("/resetpassword", resetPassword);
router.post("/forgetpassword", forgetPassword);
router.post("/verifyotp", verifyOtp);

export default router;
