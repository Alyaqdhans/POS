import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: null,
  msg: null,
}

export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username: userData.username,
        password: userData.password,
      });
      const user = response.data.username;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({ msg })
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.user = null;
        state.msg = action.payload.msg;
      })
  }
})

export default userSlice.reducer;