import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService.js";
import { toast } from "react-toastify";

export const addToCart = createAsyncThunk("add-to-cart", async (data) => {
  try {
    await apiService
      .post("/cart", data)
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.success(err.respond.data.messag, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  } catch (error) {
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(error.respond.data.message);
  }
});

export const getCart = createAsyncThunk("get-cart", async (userId) => {
  try {
    let data = {
      cartData: [],
    };
    await apiService
      .get(`/cart/${userId}`)
      .then((res) => {
        data.cartData = res.data;
      })
      .catch((err) => {
        toast.success(err.respond.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      });
    return data;
  } catch (error) {
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(error.respond.data.message);
  }
});

export const updateCart = createAsyncThunk(
  "update-cart",
  async ({ cartId, productId, quantity }) => {
    let data = [];
    console.log(cartId, productId, quantity);
    try {
      await apiService
        .put(`/cart/${cartId}`, { productId, quantity })
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          data = res.data.cart[0];
        })
        .catch((err) => {
          toast.error(err.respond.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(err);
        });
      return data;
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error.respond.data.message);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "delete-cart-product",
  async ({ cartId, productId }) => {
    try {
      let data = {
        cartData: [],
      };
      await apiService
        .delete(`/cart/${cartId}/${productId}`)
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          data.cartData = res.data.cart;
        })
        .catch((err) => {
          toast.error(err.respond.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      return data;
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error.respond.data.message);
    }
  }
);

export const checkout = createAsyncThunk(
  "checkout-product",
  async ({ data }) => {
    try {
      let newData = {
        success: false,
        orderId: null,
      };
      await apiService
        .post(`/order/`, data)
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          newData.success = true;
          newData.userId = res.data.orderId;
        })
        .catch((err) => {
          toast.error(err.respond.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          newData.success = false;
        });
      return newData;
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error.respond.data.message);
    }
  }
);
