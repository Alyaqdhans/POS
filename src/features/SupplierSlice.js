import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  status: null,
  msg: null,
  supplierList: [],
}

export const addSupplier = createAsyncThunk(
  "suppliers/addSupplier",
  async (supplierData, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addSupplier`, {
        name: supplierData.name,
        email: supplierData.email,
        mobile: supplierData.mobile,
        fax: supplierData.fax,
        address: supplierData.address,
        tax: supplierData.tax,
      });
      const msg = response.data.msg;
      const addSupplier = response.data;
      return { msg, addSupplier };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
)

export const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // addSupplier
    .addCase(addSupplier.pending, (state, action) => {
      state.status = "pendingAddSupplier";
    })
    .addCase(addSupplier.fulfilled, (state, action) => {
      state.status = "success";
      state.supplierList.push(action.payload.addSupplier);
      state.msg = action.payload.msg;
    })
    .addCase(addSupplier.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })
  }
})

export default supplierSlice.reducer;