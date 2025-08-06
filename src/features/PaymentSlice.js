import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  msg: null,
  paymentList: []
}

export const addPayment = createAsyncThunk(
  "payments/addPayment",
  async (paymentData, {rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addPayment`, {
        name: paymentData.name,
      });
      const msg = response.data.msg;
      const addPayment = response.data.addPayment;
      return { msg, addPayment };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue ({msg});
    }
  }
);

export const getPayments = createAsyncThunk(
  "payments/getPayments",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getPayments`);
      const paymentList = response.data.paymentList;
      return {paymentList}
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const deletePayment = createAsyncThunk(
  "payments/deletePayment",
  async (paymentId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deletePayment/${paymentId}`);
      const msg = response.data.msg;
      return { paymentId, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const editPayment = createAsyncThunk(
  "payments/editPayment",
  async ({paymentId, name}, {rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editPayment/${paymentId}`, {
        name: name,
      });
      const updatedPayment = response.data.updatedPayment;
      const msg = response.data.msg;
      return { paymentId, updatedPayment, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue ({ms});
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => (
    builder
    // add payment
    .addCase(addPayment.pending, (state, action) => {
      state.status = "pendingAddPayment";
    })
    .addCase(addPayment.fulfilled, (state, action) => {
      state.status = "success";
      state.paymentList.push(action.payload.addPayment);
      state.msg = action.payload.msg;
    })
    .addCase(addPayment.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // get payments
    .addCase(getPayments.pending, (state, action) => {
      state.status = "pendingGetPayments";
    })
    .addCase(getPayments.fulfilled, (state, action) => {
      state.status = "success";
      state.paymentList = action.payload.paymentList;
      state.msg = null;
    })
    .addCase(getPayments.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // edit payment
    .addCase(editPayment.pending, (state, action) => {
      state.status = "pendingEditPayment";
    })
    .addCase(editPayment.fulfilled, (state, action) => {
      state.status = "success";
      state.paymentList = state.paymentList.map(payment =>
        (payment._id === action.payload.paymentId) ? action.payload.updatedPayment : payment
      );
      state.msg = action.payload.msg;
    })
    .addCase(editPayment.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // deleteBranch
    .addCase(deletePayment.pending, (state, action) => {
      state.status = "pendingDeletePayment";
    })
    .addCase(deletePayment.fulfilled, (state, action) => {
      state.status = "success";
      state.paymentList = state.paymentList.filter(payment => payment._id !== action.payload.paymentId);
      state.msg = action.payload.msg;
    })
    .addCase(deletePayment.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })
  )
});

export default paymentSlice.reducer;