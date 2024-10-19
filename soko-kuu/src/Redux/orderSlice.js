import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//const API_URL = 'http://localhost:4000';
const API_URL = "https://api.kelynemedia.co.ke"

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/orders/place-order`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error creating order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;
