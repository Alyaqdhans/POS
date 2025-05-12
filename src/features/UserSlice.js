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
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addUser`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      })
      const addUser = response.data.addUser
      const msg = response.data.msg;
      return {addUser, msg}
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg})
    }
  }
)

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteUser/${userId}`);
      const msg = response.data.msg;
      return {userId, msg};
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg})
    }
  }
)

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({userId, password}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editUser/${userId}`, {
        password: password,
      });
      const updatedUser = response.data.updatedUser;
      const msg = response.data.msg;
      return { userId, updatedUser, msg }; 
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg})
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
        state.status = "pendingLogin";
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
        state.status = "pendingLogout";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "success";
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "rejected";
      })

      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.status = "pendingGetUsers";
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
        state.status = "pendingAddUser";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userList.push(action.payload.addUser);
        state.msg = action.payload.msg;
      })
      .addCase(addUser.rejected, (state) => {
        state.status = "rejected";
        state.msg = action.payload.msg;
      })

      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.status = "pendingDeleteUser";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = state.userList.filter(user => user._id !== action.payload.userId);
        state.msg = action.payload.msg;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "rejected";
        state.msg = action.payload.msg;
      })

      // editUser
      .addCase(editUser.pending, (state) => {
        state.status = "pendingEditUser";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = state.userList.map(user => 
          (user._id === action.payload.userId) ? action.payload.updatedUser : user
        );
        state.msg = action.payload.msg;
      })
      .addCase(editUser.rejected, (state) => {
        state.status = "rejected";
        state.msg = action.payload.msg;
      })
  }
})

export default userSlice.reducer;