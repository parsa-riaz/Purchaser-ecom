import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  forgetPassword,
  verifyOtp,
  changePassword,
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getUser,
} from "../actions/authAction";

const initialState = {
  loading: false,
  email: "",
  success: false,
  error: "",
  user: null,
  token: "",
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateEmail: (state) => {
      return {
        ...state,
        email: "", // Create a new object with an updated email property
      };
    },
    handleSuccess: (state) => {
      return {
        ...state,
        success: false,
      };
    },
    logOutUser: (state) => {
      return {
        ...state,
        email: "",
        success: false,
        error: "",
        user: null,
        token: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { error, success, token, user } = action.payload;
        return {
          ...state,
          loading: false,
          token,
          success,
          user,
          error,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(forgetPassword.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        const { email, error, success } = action.payload;
        return {
          ...state,
          loading: false,
          email,
          error,
          success,
        };
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(verifyOtp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        const { error, success } = action.payload;
        state.loading = false;
        state.error = error;
        state.success = success;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        const { error, success } = action.payload;
        state.loading = false;
        state.error = error;
        state.success = success;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const { error, success } = action.payload;
        state.loading = false;

        state.error = error;
        state.success = success;
      })
      .addCase(changePassword.rejected, (state, action) => {
        const { error, success } = action.payload;
        state.loading = false;
        state.error = error;
        state.success = success;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const { error, success } = action.payload;
        state.loading = false;
        state.error = error;
        state.success = success;
      })
      .addCase(createUser.rejected, (state, action) => {
        const { error, success } = action.payload;
        state.loading = false;
        state.error = error;
        state.success = success;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logOutUser, updateEmail, handleSuccess } = authSlice.actions;
export default authSlice.reducer;
