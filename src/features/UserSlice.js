import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: null,
  msg: null,
  user: null,
  userList: [],
}

export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.email;
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
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`);
    const msg = response.data.msg;
    return {msg};  
  }
);


export const getUsers = createAsyncThunk(
  "users/getUsers",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getUsers`);
    const userList = response.data.userList;
    return {userList};
  }
)

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addUser`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      })
      const addUser = response.data.addUser
      return {addUser}
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, {rejectWithValue}) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteUser/${userId}`);
      return {userId};
    } catch (error) {
      return rejectWithValue("Failed to delete user");
    }
  }
)

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
        state.msg = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "rejected";
      })

      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = action.payload.userList;
        state.msg = null;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "rejected";
      })

      // addUser
      .addCase(addUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = [...state.userList, action.payload.addUser];
      })
      .addCase(addUser.rejected, (state) => {
        state.status = "rejected";
      })

      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userList = state.userList.filter(user => user._id !== action.payload.userId);
      })      
      .addCase(deleteUser.rejected, (state) => {
        state.status = "rejected";
      })
  }
})

export default userSlice.reducer;