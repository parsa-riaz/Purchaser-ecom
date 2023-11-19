import Cart from "../model/cartModel.js";

export async function getCart(userId) {
  let cart = await Cart.find({ userId: userId });
  return cart[0];
}

export async function getCartbyId(cartId) {
  let cart = await Cart.findById(cartId);
  console.log(cart);
  return cart;
}

export const createCart = async (userId, productId, quantity) => {
  return new Cart({
    userId,
    items: [{ productId: productId, quantity: quantity }],
  }).save();
};

export const getCartData = async (userId) => {
  return await Cart.find({ userId: userId }).populate("items.productId").exec();
};

export async function addProduct(cartId, productId, quantity) {
  return await Cart.findByIdAndUpdate(
    { _id: cartId },
    {
      items: [{ productId, quantity }],
    },
    {
      new: true,
    }
  );
}

export const updateCart = async ({ cartId, productId, quantity }) => {
  try {
    let cart = await Cart.findOneAndUpdate(
      { _id: cartId, "items.productId": productId },
      { quantity: quantity },
      { new: true }
    );
    if (!cart) {
      throw new Error("Cart not found or product not in cart");
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error updating cart:", error);
  }

  // console.log(cartId, productId, quantity);

  // let cart = await Cart.findOneAndUpdate(
  //   { _id: cartId, "items.productId": productId },
  //   {
  //     quantity: quantity,
  //   },
  //   { new: true }
  // );
  // console.log(cart);
  // await cart.save();
  // return cart;
};

export const addOneProduct = async (cart, productId, userId, quantity) => {
  cart.items.push({
    productId,
    userId,
    quantity,
  });
  await cart.save();
  return cart;
};

export async function deleteProduct(cartId, productId) {
  let cart = await Cart.findById({ _id: cartId });
  if (cart.items.length == 0) {
    return { message: "Nothoing to remove" };
  }
  cart.items.remove({ productId: productId });
  await cart.save();
  return cart;
}
