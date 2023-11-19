import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    paymentMethod: {
      type: String,
      default: "COD",
    },
    total: {
      type: Number,
      required: true,
    },
    shpping: {
      type: Number,
      default: 150,
    },
    subtotal: {
      type: Number,
      default: 150,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const schema = mongoose.model("Order", orderSchema);
export default schema;
