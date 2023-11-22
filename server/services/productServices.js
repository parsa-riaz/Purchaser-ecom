import Product from "../model/productModel.js";

export async function getProductList(page, pageSize) {
  return await Product.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 });
}

export async function findProductById(id) {
  return await Product.findById(id);
}

export const addOne = async (body) => {
  const { title, image, discription, price, category } = body;
  const newProduct = new Product({
    title,
    image: { publicId: image.public_id, url: image.url },
    discription,
    price,
    category,
  });
  await newProduct.save();
  return newProduct;
};

export async function updateOne(id, body) {
  return await Product.findByIdAndUpdate(id, body, {
    new: true,
  });
}

export async function deleteOne(id) {
  return await Product.findByIdAndDelete(id);
}
