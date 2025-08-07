import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	status: null,
	msg: null,
	customerList: [],
}

export const addCustomer = createAsyncThunk(
	"customers/addCustomer",
	async (customerData, {rejectWithValue}) => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addCustomer`, {
				name: customerData.name,
				email: customerData.email,
				mobile: customerData.mobile,
			});
			const msg = response.data.msg;
			const addCustomer = response.data.addCustomer;
			return { msg, addCustomer };
		} catch (error) {
			const msg = error.response.data.msg;
			return rejectWithValue({msg});
		}
	}
);

export const getCustomers = createAsyncThunk(
	"customers/getCustomers",
	async (_, {rejectWithValue}) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getCustomers`);
			const customerList = response.data.customerList;
			return {customerList};
    } catch (error) {
      const msg = error.response.data.msg;
      return rejectWithValue({msg});
    }
	}
);

export const deleteCustomr = createAsyncThunk(
	"customers/deleteCustomer",
	async (customerId, {rejectWithValue}) => {
		try {
			const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteCustomer/${customerId}`);
			const msg = response.data.msg;
			return {customerId, msg};
		} catch (error) {
			const msg = error.response.data.msg;
			return rejectWithValue({msg})
		}
	}
);

export const editCustomer = createAsyncThunk(
	"customers/editCustomer",
	async ({customerId, name, mobile}, {rejectWithValue}) => {
		try {
			const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editCustomer/${customerId}` , {
				name: name,
				mobile: mobile
			});
			const updatedCustomer = response.data.updatedCustomer;
			const msg = response.data.msg;
			return { customerId, updatedCustomer, msg };
		} catch (error) {
			const msg = error.response.data.msg;
			return rejectWithValue({msg});
		}
	}
);

export const customerSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {
    clearMsg: (state) => {
      state.msg = null;
    },
  },
	extraReducers: (builder) => (
		builder
		// addCustomer
		.addCase(addCustomer.pending, (state, action) => {
			state.status = "pendingAddCustomer";
		})
		.addCase(addCustomer.fulfilled, (state, action) => {
			state.status = "success";
			state.customerList.push(action.payload.addCustomer);
			state.msg = action.payload.msg;
		})
		.addCase(addCustomer.rejected, (state, action) => {
			state.status = "rejected";
			state.msg = action.payload.msg;
		})
		
		// getCustomers
		.addCase(getCustomers.pending, (state, action) => {
			state.status = "pendingGetCustomers";
		})
		.addCase(getCustomers.fulfilled, (state, action) => {
			state.status = "success";
			state.customerList = action.payload.customerList;
      state.msg = null;
		})
		.addCase(getCustomers.rejected, (state, action) => {
			state.status = 'rejected';
			state.msg = action.payload.msg;
		})

		// deleteCustomer
		.addCase(deleteCustomr.pending, (state, action) => {
			state.status = "pendingDeleteCustomer";
		})
		.addCase(deleteCustomr.fulfilled, (state, action) => {
			state.status = "success";
			state.customerList = state.customerList.filter(customer => customer._id !== action.payload.customerId);
			state.msg = action.payload.msg;
		})
		.addCase(deleteCustomr.rejected, (state, action) => {
			state.status = "rejected";
			state.msg = action.payload.msg;
		})

		// editCustomer
		.addCase(editCustomer.pending, (state, action) => {
			state.status = "pendingEditCustomer";
		})
		.addCase(editCustomer.fulfilled, (state, action) => {
			state.status = "success";
			state.customerList = state.customerList.map(customer => 
				(customer._id === action.payload.customerId) ? action.payload.updatedCustomer : customer
			);
			state.msg = action.payload.msg;
		})
		.addCase(editCustomer.rejected, (state, action) => {
			state.status = "rejected";
			state.msg = action.payload.msg;
		})
	)
})

export default customerSlice.reducer;
export const {clearMsg} = customerSlice.actions;