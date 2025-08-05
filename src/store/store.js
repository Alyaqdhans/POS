import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";
import systemReducer  from "../features/SystemSlice";
import customerReducer  from "../features/CustomerSlice";
import supplierReducer from '../features/SupplierSlice';
import categoryReducer from '../features/CategorySlice';
import branchReducer from '../features/BranchSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    system: systemReducer,
    customers: customerReducer,
    suppliers: supplierReducer,
    categories: categoryReducer,
    branches: branchReducer,
  },
})