import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";
import { toast } from "react-toastify";

export const getAllOrders = createAsyncThunk(
  "get-all-orders",
  async ({ userId }) => {
    try {
      let data = [];
      await apiService
        .get(`/order/${userId}`)
        .then((res) => {
          console.log(res.data);
          data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllOrdersAdmin = createAsyncThunk(
  "get-all-orders-admin",
  async ({ token, user }) => {
    try {
      let data = [];
      await apiService
        .get(
          `/order`,
          { user },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          data = res.data.orders;
        })
        .catch((err) => {
          console.log(err);
          data = err.response.data.orders;
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getSingleOrder = createAsyncThunk(
  "get-single-order",
  async ({ token, user, id }) => {
    try {
      let data = [];
      await apiService
        .get(
          `/order/single/${id}`,
          { user },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const { order } = res.data;
          data = order;
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateStatus = createAsyncThunk(
  "updaet-order-status",
  async ({ token, id, status }) => {
    try {
      let data = [];
      await apiService
        .put(
          `/order/${id}`,
          { status: status },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          data = res.data.orders;
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
);
