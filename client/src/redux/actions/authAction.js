import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";
import { toast } from "react-toastify";

export const createUser = createAsyncThunk("sign-up", async (data) => {
  try {
    let result = {
      error: "",
      success: "",
    };
    await apiService
      .post("/users/sign-up", data)
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        result.success = true;
      })
      .catch((err) => {
        let error = err.response.data.message;
        result.error = error;
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    return result;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return "Something went wrong";
  }
});
export const loginUser = createAsyncThunk("login-user", async (formData) => {
  try {
    let result = {
      token: "",
      user: null,
      error: "",
      success: false,
    };
    await apiService
      .post("/users/login", formData)
      .then((res) => {
        const { token, user, message } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id);
        result.token = token;
        result.user = user;
        result.success = true;

        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        let error = err.response.data.message;
        result.error = error;
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    return result;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return "Something went wrong";
  }
});

export const forgetPassword = createAsyncThunk(
  "forget-password",
  async ({ email }) => {
    try {
      let result = {
        email: "",
        error: "",
        success: false,
      };
      await apiService
        .post("/users/forgetpassword", { email })
        .then((res) => {
          toast.success("An email send to your account please verify", {
            position: toast.POSITION.TOP_RIGHT,
          });

          result.email = email;
          result.success = true;
        })
        .catch((err) => {
          let error = err.response.data.message;
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });
          result.error = error;
        });
      return result;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "verify-otp",
  async ({ otp, email }) => {
    try {
      let result = {
        error: "",
        success: false,
      };
      await apiService
        .post("/users/verifyotp", { email, otp })
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });

          result.success = true;
        })
        .catch((err) => {
          let error = err.response.data.message;
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });
          result.error = error;
        });
      return result;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);

export const changePassword = createAsyncThunk(
  "change-password",
  async ({ email, password }) => {
    let result = {
      success: "",
      error: "",
    };

    try {
      await apiService
        .post("/users/resetpassword", { email, password })
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          result.success = true;
        })
        .catch((err) => {
          let error = err.response.data.message;
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });
          result.error = error;
        });
      return result;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);
export const updateUser = createAsyncThunk(
  "update-user",
  async ({ id, token, formData }) => {
    try {
      let user = null;
      await apiService
        .put(`/users/${id}`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          user = res.data.user;
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
      return user;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);
export const daleteUser = createAsyncThunk(
  "delete-user",
  async ({ id, token }) => {
    try {
      await apiService
        .delete(`/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.clear();
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

export const getAllUsers = createAsyncThunk(
  "all-users",
  async ({ user, token }) => {
    console.log(token, user);
    try {
      let users = [];
      await apiService
        .get(
          `/users/`,
          { user },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          users = res.data;
        })
        .catch((err) => {
          let error = err.response.data.message;

          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      return users;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return "Something went wrong";
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete-user",
  async ({ id, token }) => {
    try {
      let data = [];
      apiService
        .delete(`/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          data = res.data.users;
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
      return "Something went wrong";
    }
  }
);
export const getUser = createAsyncThunk("get-user", async ({ id, token }) => {
  try {
    let data = {};
    apiService
      .get(`/users/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        data = res.data.user;
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
    return "Something went wrong";
  }
});

export const logOutUser = createAsyncThunk(
  "get-user",
  async ({ id, token }) => {
    try {
      let data = {
        user: null,
        token: "",
        cart: [],
      };

      return data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
);
