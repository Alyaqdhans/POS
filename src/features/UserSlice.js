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
      const response = await axios.post(`${process.env.SERVER_URL}/login`, {
        username: userData.username,
        password: userData.password,
      });
      const user = response.data.username;
      const msg = response.data.msg;
      return {user, msg};
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg})
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const response = await axios.post(`${process.env.SERVER_URL}/logout`);
      const msg = response.data.msg;
      return {msg};
    } catch (error) {
      
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
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

      //logout
      .addCase(logout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "success";
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "rejected";
      })
  }
})

export default userSlice.reducer;