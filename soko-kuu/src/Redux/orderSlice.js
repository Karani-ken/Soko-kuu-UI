import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearCart } from './cartSlice';
//const API_URL = 'http://localhost:4000';
const API_URL = "https://api.kelynemedia.co.ke"

// Place an order and clear cart after success
export const createOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/orders/place-order`, orderData);
      console.log(response.status)
      if (response.status === 200) {
        // Order placed successfully
        const cart_id = orderData.cart_id;
        console.log(cart_id)
                // Dispatch clearCart to clear the cart on the server
        dispatch(clearCart(cart_id));
        console.log(`cart of ${cart_id} was deleted`)

        return response.data;
      } else {
        return rejectWithValue('Order failed');
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data || 'Error placing order');
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
