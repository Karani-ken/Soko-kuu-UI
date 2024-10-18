import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Redux/cartSlice';
import orderReducer from '../Redux/orderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer
  },
});
