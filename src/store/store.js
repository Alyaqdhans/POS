import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
import customerReucer from "../features/CustomerSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    customers: customerReucer,
  },
})