import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData) => {
        const response = await axios.post(`${API_URL}/orders`, orderData);
        return response.data;
    }
);

export const fetchOrderHistory = createAsyncThunk(
    'order/fetchOrderHistory',
    async (phoneNumber) => {
        const response = await axios.get(`${API_URL}/orders/${phoneNumber}`);
        return response.data;
    }
);

const initialState = {
    currentOrder: null,
    orderHistory: [],
    status: 'idle',
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentOrder = action.payload;
                state.error = null;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchOrderHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderHistory = action.payload;
                state.error = null;
            })
            .addCase(fetchOrderHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer; 