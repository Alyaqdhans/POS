import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  status: null,
  msg: null,
  systemData: {},
  logo: null
}

export const getSystem = createAsyncThunk(
  "system/get",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getSystem`)
    const systemData = response.data.systemData;
    const logo = response.data.logo;
    return {systemData, logo}
  }
)

export const saveSystem = createAsyncThunk(
  "system/save",
  async (systemData, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/saveSystem`,
        systemData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      );
      const msg = response.data.msg;
      return {msg};
    } catch(error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
)

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = null;
    },
  },
  extraReducers: (builder) => (
    builder
    // Get System
    .addCase(getSystem.pending, (state, action) => {
      state.status = "pendingGetSystem";
    })
    .addCase(getSystem.fulfilled, (state, action) => {
      state.status = "success";
      state.systemData = action.payload.systemData;
      state.logoData = action.payload.logo;
    })
    .addCase(getSystem.rejected, (state, action) => {
      state.status = "rejected";
    })
    // Save System
    .addCase(saveSystem.pending, (state, action) => {
      state.status = "pendingSaveSystem";
    })
    .addCase(saveSystem.fulfilled, (state, action) => {
      state.status = "success";
      state.msg = action.payload.msg;
    })
    .addCase(saveSystem.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })
  )
})

export default systemSlice.reducer;
export const {clearMsg} = systemSlice.actions;