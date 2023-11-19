import Product from "../model/productModel.js";
import {
  getProductList,
  findProductById,
  addOne,
  updateOne,
  deleteOne,
} from "../services/productServices.js";
import { findUser } from "../services/userServices.js";
import cloudinary from "../utils/cloudinary.js";

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const { page, pageSize } = req.query;

    const products = await getProductList(page, pageSize);
    if (products.length == 0)
      return res.status(404).json({ message: "No product found yet" });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//get single products
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await findProductById(id);

    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// add product
export const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { title, discription, price, category } = req.body.data;
    // const file = req.data.image;
    const file = req.body.data.image;
    console.log(file);
    const result = await cloudinary.uploader.upload(file, {
      folder: "purchaserApp",
    });
    let uploaded = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    let body = {
      title,
      image: uploaded,
      discription,
      price,
      category,
    };
    await addOne(body);
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

//update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await updateOne(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addRatingAndReview = async (req, res) => {
  try {
    const { userId, productId, rating, review } = req.body;
    console.log(req.body);
    let user = await findUser(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    let product = await findProductById(productId);
    if (!product) return res.status(400).json({ message: "Product not found" });
    if (product.reviews.length != 0) {
      let alreadyReview = product.reviews.find((r) => {
        return r.userId.toString() === userId;
      });
      if (alreadyReview)
        return res.status(400).json({
          message: "You already reviwed this product",
          product: product,
        });
    }

    let data = {
      userId: user._id,
      userName: user.userName,
      rating: rating,
      review: review,
    };
    product.reviews.push(data);
    await product.save();
    const ratingsCount = product.reviews.length;
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    let averageRating = ratingsCount > 0 ? totalRating / ratingsCount : 0;
    let updatedProduct = await updateOne(productId, {
      avgRating: averageRating,
    });

    return res
      .status(200)
      .json({ message: "review added successfuly", product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const filterByCategory = async (req, res) => {
  try {
    let { category } = req.query;
    console.log(category);
    const products = await getProductList();
    const filteredProducts = products.filter((product) => {
      return product.category.toLowerCase() === category.toLowerCase();
    });
    if (filteredProducts.length == 0)
      return res.status(404).json({ message: "no products found" });
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const filterByRating = async (req, res) => {
  try {
    const minRating = req.query.minRating;
    const maxRating = req.query.maxRating;
    const products = await getProductList();
    const filteredProducts = products.filter((product) => {
      return product.avgRating >= minRating && product.avgRating < maxRating;
    });
    if (filteredProducts.length == 0)
      return res.status(404).json({ message: "no products found" });
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteOne(id);
    product
      ? res.status(200).json({ message: "Product deleted" })
      : res.status(200).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    let { search } = req.query;
    const products = await getProductList();
    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase());
    });

    if (filteredProducts.length == 0)
      return res.status(404).json({ message: "no products found" });
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
