import {
  getCart,
  createCart,
  addProduct,
  updateCart,
  addOneProduct,
  getCartbyId,
  deleteProduct,
  getCartData,
} from "../services/cartServices.js";

export const addToCart = async (req, res) => {
  try {
    let { userId, productId, quantity } = req.body;
    let cart = await getCart(userId);
    console.log(cart);
    if (!cart) {
      const newCart = await createCart(userId, productId, quantity);
      return res.status(200).json({ message: "Product added", cart: newCart });
    }
    if (cart.items.length == 0) {
      await addProduct(cart._id, productId, quantity);
      return res.status(200).json({
        message: "Product added successfully",
      });
    }

    let productIndex = cart.items.findIndex((item) => {
      return item.productId == productId;
    });
    if (productIndex > -1) {
      //product exists in the cart, update the quantity
      let productItem = cart.items[productIndex];
      productItem.quantity += 1;
      cart.items[productIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart.items.push({ productId, quantity });
    }
    cart = await cart.save();
    res.status(200).json({ message: "Product Added to cart" });
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error);
  }
};

export const updatingCart = async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;
  const cart = await getCartbyId(cartId);
  console.log(cart);
  let productIndex = cart.items.findIndex((item) => {
    return item.productId == productId;
  });

  let productItem = cart.items[productIndex];
  productItem.quantity = quantity;
  cart.items[productIndex] = productItem;

  await cart.save();
  res.status(200).json({ message: "cart updated", cart: cart });
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await getCart(userId);
    let cartData = await getCartData(userId);
    res.status(200).json(cartData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await deleteProduct(cartId, productId);
    res
      .status(200)
      .json({ message: "product remove successfully", cart: cart });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
