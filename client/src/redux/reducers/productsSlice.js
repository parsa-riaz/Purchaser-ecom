import { createSlice } from "@reduxjs/toolkit";
import {
  addNewProduct,
  addReview,
  getFilterByCategory,
  getFilterByRating,
  getProducts,
  getSingleProduct,
  searchProducts,
} from "../actions/productsAction.js";

const initialState = {
  products: [],
  product: null,
  loading: false,
  rating: 0,
  category: "",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    lowToHigh: (state) => {
      state.products = state.products.sort((a, b) => a.price - b.price);
    },
    HighToLow: (state) => {
      state.products = state.products.sort((a, b) => b.price - a.price);
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSingleProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(addReview.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getFilterByRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilterByRating.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getFilterByRating.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getFilterByCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getFilterByCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewProduct.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { allProducts, lowToHigh, HighToLow, setRating, setCategory } =
  productsSlice.actions;
export default productsSlice.reducer;
