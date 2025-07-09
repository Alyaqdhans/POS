import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  status: null,
  msg: null,
  categoryList: []
}

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addCategory`, {
        name: categoryData.name,
      });
      const msg = response.data.msg;
      const addCategory = response.data;
      return { msg, addCategory };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getCategories`)
    const categoryList = response.data.categoryList;
    return {categoryList};
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({categoryId, name}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editCategory/${categoryId}`, {
        name: name,
      });
      const updatedCategory = response.data.updatedCategory;
      const msg = response.data.msg;
      return { categoryId, updatedCategory, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteCategory/${categoryId}`);
      const msg = response.data.msg;
      return { categoryId, msg };
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
  }
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.msg = null;
    },
  },
  extraReducers: (builder) => (
    builder
    .addCase(addCategory.pending, (state, action) => {
      state.status = "pendingAddCategory";
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.categoryList.push(action.payload.addCategory);
      state.msg = action.payload.msg;
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // getCategories
    .addCase(getCategories.pending, (state, action) => {
      state.status = "pendingGetCategories";
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.categoryList = action.payload.categoryList;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.status = "rejected";
    })

    // editCategory
    .addCase(editCategory.pending, (state, action) => {
      state.status = "pendingEditCategory";
    })
    .addCase(editCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.categoryList = state.categoryList.map(category =>
        (category._id === action.payload.categoryId) ? action.payload.updatedCategory : category
      );
      state.msg = action.payload.msg;
    })
    .addCase(editCategory.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })

    // deleteCategory
    .addCase(deleteCategory.pending, (state, action) => {
      state.status = "pendingDeleteCategory";
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.categoryList = state.categoryList.filter(category => category._id !== action.payload.categoryId);
      state.msg = action.payload.msg;
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.status = "rejected";
      state.msg = action.payload.msg;
    })
  )
})

export default categorySlice.reducer;
export const {clearMsg} = categorySlice.actions;