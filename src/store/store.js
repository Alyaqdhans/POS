import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
import customerReducer  from "../features/CustomerSlice";
import supplierReducer from '../features/SupplierSlice';
import categoryReducer from '../features/CategorySlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    customers: customerReducer,
    suppliers: supplierReducer,
    categories: categoryReducer,
  },
})