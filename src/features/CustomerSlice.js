import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: null,
    msg: null,
    customerList: [],
    user: null,
}

export const addCustomer = createAsyncThunk(
    "customers/addCustomer",
    async (customerData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addCustomer`, {
                name: customerData.name,
                email: customerData.name,
                mobile: customerData.name,
            });
        const msg = response.data.msg;
        return msg;
        } catch (error) {
            const msg = error.response.data.msg;
            return rejectWithValue({msg});
        }
    }
);

export const getCustomers = createAsyncThunk(
    "customers/getCustomers",
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getCustomers`);
        const customerList = response.data.customerList;
        return {customerList};
    }
)

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
        // add Customer
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

        // get Customers
        .addCase(getCustomers.pending, (state, action) => {
            state.status = "pendingGetCustomers";
        })
        .addCase(getCustomers.fulfilled, (state, action) => {
            state.status = "success";
            state.customerList = action.payload.customerList;
            const customerIndex = action.payload.customerList.findIndex((customer) => customer._id === state.customer._id);
            if (customerIndex) {
                state.customer = action.payload.customerList[customerIndex];
            }
        })
        .addCase(getCustomers.rejected, (state, action) => {
            state.status = 'rejected';
        })
    )
})

export default customerSlice.reducer;
export const {clearMsg} = customerSlice.actions;