import {
  getUsers,
  findUser,
  addUser,
  updateOnePassword,
  deleteOne,
  updateOtp,
  findByEmail,
  hashPassword,
  updateOne,
} from "../services/userServices.js";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/sendEmail.js";

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    users.length !== 0
      ? res.status(200).json(users)
      : res.status(404).json({ message: "No user found yet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single user
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUser(id);

    user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: "User not found", user: {} });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//register user
export const registerUser = async (req, res) => {
  try {
    let {
      userName,
      email,
      password,
      terms,
      role,
      province,
      address,
      phone,
      city,
    } = req.body;
    console.log(req.body);
    let userExsists = await findByEmail(email);
    if (userExsists) {
      return res.status(400).json({ message: "User already exists" });
    }

    password = await hashPassword(password);
    await addUser(
      userName,
      email,
      password,
      role,
      terms,
      province,
      address,
      phone,
      city
    );
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateOne(id, req.body);
    if (!user) {
      return res.status(400).json({ message: "User not found", user });
    }
    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await deleteOne(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const users = await getUsers();
    res
      .status(200)
      .json({ message: "Successfully Deleted User", users: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Check your email" });
    }
    let passwordValidation = await bycrpt.compare(password, user.password);
    if (!passwordValidation) {
      return res.status(404).json({ message: "Incorrect password" });
    }
    let token = jwt.sign(
      { id: user._id, name: user.userName, role: user.role },
      process.env.JWT_KEY
    );
    res
      .status(200)
      .json({ message: "Login successfully", token: token, user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    password = await hashPassword(password);
    await updateOnePassword(email, password);
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//forget password
export const forgetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    let user = await findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Check your email" });
    }
    let otp = Math.floor(100000 + Math.random() * 999999);
    user = await updateOtp(email, otp);
    let sendMail = await sendEmail(email, otp);
    res.status(200).json({ message: sendMail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    let user = await findByEmail(email);
    let date = new Date(user.updatedAt).getTime();
    console.log(date);
    const nowdate = new Date().getTime(); // Current date and time
    console.log(nowdate);
    const timeDifferences = nowdate - date;
    if (user.otp == otp && timeDifferences > 0) {
      await updateOtp(email, null);
      res.status(200).json({ message: "otp success" });
    } else {
      res
        .status(400)
        .json({ message: "otp rejected: Please check your otp again" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
