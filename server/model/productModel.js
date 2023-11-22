import mongoose, { Mongoose, SchemaType } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    discription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    avgRating: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 5.0,
    },

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: {
          type: Number,
        },
        userName: { type: String },
        rating: {
          type: Number,
        },
        rating: {
          type: Number,
          default: 0.0,
          min: 0,
          max: 5,
        },
        review: {
          type: String,
        },
      },
    ],
  },

  { timestamps: true }
);

const schema = mongoose.model("Product", productSchema);
export default schema;
