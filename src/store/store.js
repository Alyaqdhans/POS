import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
import customerReducer  from "../features/CustomerSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    customers: customerReducer,
  },
})