import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService.js";
import { toast } from "react-toastify";

export const addNewProduct = createAsyncThunk(
  "add-product",
  async ({ data, token, user }) => {
    try {
      await apiService
        .post(
          "/products/create",
          { data, user },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((err) => {
          let error = err.response.data.message;
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
);
export const getProducts = createAsyncThunk(
  "products",
  async ({ page, pageSize }) => {
    console.log(page.pageSize);
    try {
      let data = [];
      await apiService
        .get(`/products?page=${page}&pageSize=${pageSize}`)
        .then((res) => {
          data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    } catch (error) {
      console.log(error);

      return error.respond.data.message;
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "single-product",
  async (id) => {
    try {
      let data = null;
      await apiService
        .get(`/products/${id}`)
        .then((res) => {
          data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);

export const addReview = createAsyncThunk("review-product", async (data) => {
  try {
    let singleProduct = {};
    await apiService
      .post("/products/review", data)
      .then((res) => {
        singleProduct = res.data.product;
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        let error = err.response.data.message;
        singleProduct = err.response.data.product;
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    return singleProduct;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return "Something went wrong";
  }
});
export const getFilterByCategory = createAsyncThunk(
  "filter-by-category",
  async ({ category }) => {
    try {
      console.log(category);
      let data = [];
      await apiService
        .get(`/products/category?category=${category}`)
        .then((res) => {
          data = res.data;
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);

export const getFilterByRating = createAsyncThunk(
  "filter-by-rating",
  async (rating) => {
    try {
      let data = [];
      await apiService
        .get(`/products/rating?minRating=${rating}&maxRating=${rating + 1}`)
        .then((res) => {
          data = res.data;
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);

export const searchProducts = createAsyncThunk(
  "search-products",
  async (search) => {
    try {
      let data = [];
      await apiService
        .get(`/products/search?search=${search}`)
        .then((res) => {
          data = res.data;
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);
