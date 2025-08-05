import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  msg: null,
  branchList: []
}

export const addBranch = createAsyncThunk(
  "branches/addBranche",
  async (brancheData, {rejectedWithValue}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addBranch`, {
        name: brancheData.name,
        mobile: brancheData.mobile,
      });
      const msg = response.data.msg;
      const addBranch = response.data.addBranch;
      return { msg, addBranch };
    } catch (error) { 
      const msg = error.response.data.msg;
      return rejectedWithValue({msg});
    }
  }
);

export const branchSlise = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = null;
    },
  },
  extraReducers: (builder) => (
    builder
    // add branch
    .addCase(addBranch.pending, (state, action) => {
      state.status = "pendingAddBranch";
    })
    .addCase(addBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branchList.push(action.payload.addBranch);
      state.msg = action.payload.msg;
    })
    .addCase(addBranch.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })
  )
})

export default branchSlise.reducer;
export const {clearMsg} = branchSlise.actions;