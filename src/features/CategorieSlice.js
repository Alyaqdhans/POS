import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  status: null,
  msg: null,
  categorieList: []
}

export const addCategorie = createAsyncThunk(
  "categories/addCategorie",
  async (categorieData, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addCategorie`, {
        name: categorieData.name,
      });
      const msg = response.data.msg;
      const addCategorie = response.data;
      return { msg, addCategorie };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const getCategories = createAsyncThunk(
  "caregories/getCategories",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getCategories`)
    const categorieList = response.data.categorieList;
    return {categorieList};
  }
);

export const editCategorie = createAsyncThunk(
  "categories/editCategorie",
  async ({categorieId, name}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editCategorie/${categorieId}`, {
        name: name,
      });
      const updatedCategorie = response.data.updatedCategorie;
      const msg = response.data.msg;
      return { categorieId, updatedCategorie, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const deleteCategorie = createAsyncThunk(
  "categories/deleteCategorie",
  async (categorieId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteCategorie/${categorieId}`);
      const msg = response.data.msg;
      return { categorieId, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const categorieSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = null;
    },
  },
  extraReducers: (builder) => (
    builder
    .addCase(addCategorie.pending, (state, action) => {
      state.status = "pendingAddCategorie";
    })
    .addCase(addCategorie.fulfilled, (state, action) => {
      state.status = "success";
      state.categorieList.push(action.payload.addCategorie);
      state.msg = action.payload.msg;
    })
    .addCase(addCategorie.rejected, (state, action) => {
      state.status = "rejected";
    })

    // getCategories
    .addCase(getCategories.pending, (state, action) => {
      state.status = "pendingGetCategories";
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.categorieList = action.payload.categorieList;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.status = "rejected";
    })

    // editCategorie
    .addCase(editCategorie.pending, (state, action) => {
      state.status = "pendingEditCategorie";
    })
    .addCase(editCategorie.fulfilled, (state, action) => {
      state.status = "success";
      state.categorieList = state.categorieList.map(categorie =>
        (categorie._id === action.payload.categorieId) ? action.payload.updatedCategorie : categorie
      );
      state.msg = action.payload.msg;
    })
    .addCase(editCategorie.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // deleteCategorie
    .addCase(deleteCategorie.pending, (state, action) => {
      state.status = "pendingDeleteCategorie";
    })
    .addCase(deleteCategorie.fulfilled, (state, action) => {
      state.status = "success";
      state.categorieList = state.categorieList.filter(categorie => categorie._id !== action.payload.categorieId);
      state.msg = action.payload.msg;
    })
    .addCase(deleteCategorie.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })
  )
})

export default categorieSlice.reducer;
export const {clearMsg} = categorieSlice.actions;