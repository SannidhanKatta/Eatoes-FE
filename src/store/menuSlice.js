import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchMenu = createAsyncThunk(
    'menu/fetchMenu',
    async () => {
        const response = await axios.get(`${API_URL}/menu/categories`);
        return response.data;
    }
);

const initialState = {
    categories: {},
    status: 'idle',
    error: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default menuSlice.reducer; 