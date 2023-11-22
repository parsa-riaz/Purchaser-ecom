import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrders,
  getAllOrdersAdmin,
  getSingleOrder,
  updateStatus,
} from "../actions/orderActions";

const initialState = {
  orders: [],
  loading: false,
  allOrders: [],
  order: {},
};
const cartSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(updateStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { handleSuccess } = cartSlice.actions;
export default cartSlice.reducer;
