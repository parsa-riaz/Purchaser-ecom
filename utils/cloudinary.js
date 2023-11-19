import cloude from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
let cloudinary = cloude.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default cloudinary;
