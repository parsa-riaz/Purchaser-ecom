import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import productsSlice from "./reducers/productsSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./reducers/cartSlice";
import orderSlice from "./reducers/orderSlice";

const reducers = combineReducers({
  auth: authSlice,
  products: productsSlice,
  cart: cartSlice,
  orders: orderSlice,
});
const persistConfig = {
  key: "root",
  storage,
};

const persist = persistReducer(persistConfig, reducers);
const Store = configureStore({
  reducer: persist,
});

export default Store;
