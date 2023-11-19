import User from "../model/userModel.js";
import bycrpt from "bcryptjs";

export async function getUsers() {
  return await User.find();
}

export async function findUser(id) {
  return await User.findById(id);
}

export const findByEmail = async (email) => {
  let user = await User.find({ email: email });
  return user[0];
};

export const addUser = async (
  userName,
  email,
  password,
  role,
  terms,
  province,
  address,
  phone,
  city
) => {
  return await new User({
    userName,

    email,
    password,
    role,
    terms,
    province,
    address,
    phone,
    city,
  }).save();
};

export async function updateOne(id, body) {
  return await User.findByIdAndUpdate(id, body, {
    new: true,
  });
}

export async function updateOnePassword(email, password) {
  return await User.findOneAndUpdate(
    { email },
    { password: password },
    {
      new: true,
    }
  );
}

export async function updateOtp(email, otp) {
  return await User.findOneAndUpdate(
    { email: email },
    { otp: otp },
    {
      new: true,
    }
  );
}

export async function deleteOne(id) {
  return await User.findByIdAndDelete(id);
}

export const hashPassword = async (password) => {
  const salt = await bycrpt.genSalt(10);
  password = await bycrpt.hash(password, salt);
  return password;
};
