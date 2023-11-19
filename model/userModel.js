import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    terms: { type: Boolean, required: true },
    role: { type: String, default: "user" },
    address: String,
    city: String,
    province: String,
    phone: Number,
    otp: String,
  },
  { timestamps: true }
);

const schema = mongoose.model("User", userSchema);
export default schema;
