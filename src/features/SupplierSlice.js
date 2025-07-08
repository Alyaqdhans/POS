import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  msg: null,
  supplierList: [],
};

export const addSupplier = createAsyncThunk(
  "suppliers/addSupplier",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/addSupplier`,
        {
          name: supplierData.name,
          email: supplierData.email,
          mobile: supplierData.mobile,
          fax: supplierData.fax,
          address: supplierData.address,
          tax: supplierData.tax,
        }
      );
      const msg = response.data.msg;
      const addSupplier = response.data;
      return { msg, addSupplier };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);

export const getSuppliers = createAsyncThunk(
  "suppliers/getSuppliers",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/getSuppliers`
    );
    const supplierList = response.data.supplierList;
    return { supplierList };
  }
);

export const editSupplier = createAsyncThunk(
  "suppliers/editSupplier",
  async (
    { supplierId, name, mobile, fax, address, tax },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/editSupplier/${supplierId}`,
        {
          name: name,
          mobile: mobile,
          fax: fax,
          address: address,
          tax: tax,
        }
      );
      const updatedSupplier = response.data.updatedSupplier;
      const msg = response.data.msg;
      return { supplierId, updatedSupplier, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (supplierId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/deleteSupplier/${supplierId}`
      );
      const msg = response.data.msg;
      return { supplierId, msg };
    } catch (error) {
      return rejectWithValue({ msg });
    }
  }
);

export const supplierSlice = createSlice({
  name: "suppliers",
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

      // getSuppliers
      .addCase(getSuppliers.pending, (state, action) => {
        state.status = "pendingGetSuppliers";
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.status = "success";
        state.supplierList = action.payload.supplierList;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.status = "rejeted";
      })

      // editSupplier
      .addCase(editSupplier.pending, (state, action) => {
        state.status = "pendingEditSupplier";
      })
      .addCase(editSupplier.fulfilled, (state, action) => {
        state.status = "success";
        state.supplierList = state.supplierList.map((supplier) =>
          supplier._id === action.payload.supplierId
            ? action.payload.updatedSupplier
            : supplier
        );
        state.msg = action.payload.msg;
      })
      .addCase(editSupplier.rejected, (state, action) => {
        state.status = "rejected";
        state.msg = action.payload.msg;
      })

      // deleteSupplier
      .addCase(deleteSupplier.pending, (state, action) => {
        state.status = "pendingDeleteSupplier";
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.status = "success";
        state.supplierList = state.supplierList.filter((supplier) => supplier._id !== action.payload.supplierId);
        state.msg = action.payload.msg;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.status = "rejected";
        state.msg = action.payload.msg;
      })
  },
});

export default supplierSlice.reducer;
export const { clearMsg } = supplierSlice.actions;
