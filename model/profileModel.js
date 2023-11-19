import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);

const schema = mongoose.model("Profile", profileSchema);
export default schema;
