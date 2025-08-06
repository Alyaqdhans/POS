import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  msg: null,
  branchList: []
}

export const addBranch = createAsyncThunk(
  "branches/addBranch",
  async (brancheData, {rejectWithValue}) => {
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
      return rejectWithValue({msg});
    }
  }
);

export const getBranches = createAsyncThunk(
  "branches/getBranches",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getBranches`);
      const branchList = response.data.branchList;
      return {branchList}
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const editBranch = createAsyncThunk(
  "branches/editBranch",
  async ({branchId, name, mobile}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editBranch/${branchId}`, {
        name: name,
        mobile: mobile,
      });
      const updatedBranch = response.data.updatedBranch;
      const msg = response.data.msg;
      return { branchId, updatedBranch, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branches/deleteBranch",
  async (branchId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteBranch/${branchId}`);
      const msg = response.data.msg;
      return { branchId, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const branchSlise = createSlice({
  name: 'branches',
  initialState,
  reducers: {},
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

    // getBranches
    .addCase(getBranches.pending, (state, action) => {
      state.status = "pendingGetBranches";
    })
    .addCase(getBranches.fulfilled, (state, action) => {
      state.status = "success";
      state.branchList = action.payload.branchList;
      state.msg = null;
    })
    .addCase(getBranches.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // editBranch
    .addCase(editBranch.pending, (state, action) => {
      state.status = "pendingEditBranch";
    })
    .addCase(editBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branchList = state.branchList.map(branch =>
        (branch._id === action.payload.branchId) ? action.payload.updatedBranch : branch
      );
      state.msg = action.payload.msg;
    })
    .addCase(editBranch.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // deleteBranch
    .addCase(deleteBranch.pending, (state, action) => {
      state.status = "pendingDeleteBranch";
    })
    .addCase(deleteBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branchList = state.branchList.filter(branch => branch._id !== action.payload.branchId);
      state.msg = action.payload.msg;
    })
    .addCase(deleteBranch.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })
  )
})

export default branchSlise.reducer;