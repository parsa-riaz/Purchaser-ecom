import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(bodyParser.json());
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/users", userRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("connected", () => {
  console.log("database connected");
});

app.listen(process.env.PORT, () => {
  console.log("server listening on port " + process.env.PORT);
});
