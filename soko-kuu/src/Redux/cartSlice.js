import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

//const API_URL = 'http://localhost:4000';
const API_URL = "https://api.kelynemedia.co.ke"

const initialState = {
  cart: null,
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

// Thunks for async actions

// Fetch cart by customer ID
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (customer_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cart/cart/${customer_id}`);

      // Check if the cart exists and has items
      if (response.data.length === 0) {
        // Return an empty array if the cart is empty
        return []; // or return { items: [] } if you prefer to keep the structure
      }

      const cart_id = response.data[0].cart_id;
      const cartItemsData = await axios.get(`${API_URL}/cart/cart-items/${cart_id}`);

      // Check if there are cart items
      if (cartItemsData?.data.length === 0) {
        return []; // Return an empty array if there are no cart items
      }
     // console.log(cartItemsData.data)
      return cartItemsData.data; // Return the fetched cart items

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Add item to cart
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ customer_id, itemData }, { dispatch, rejectWithValue }) => {
    try {
      let cartResponse = await axios.get(`${API_URL}/cart/cart/${customer_id}`);
      let cart = cartResponse.data[0];

      if (!cart) {
        await axios.post(`${API_URL}/cart/add-cart`, { customer_id });
        let cartResponse = await axios.get(`${API_URL}/cart/cart/${customer_id}`);
        cart = cartResponse.data[0];
      }

      const response = await axios.post(`${API_URL}/cart/add-cart/${cart.cart_id}`, itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error adding item to cart');
    }
  }
);

// Update item quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cart_item_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/cart/update/items/${cart_item_id}`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove item from cart
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (cart_item_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/delete/items/${cart_item_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Clear cart by cart_id
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (cart_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/delete/all-items/${cart_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error clearing cart');
    }
  }
);


// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        //toast.success('Cart fetched successfully!'); // Notify success
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error fetching cart: ${action.payload.message}`); // Notify error
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        //toast.success('Item added to cart!'); // Notify success
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error adding item to cart: ${action.payload}`); // Notify error
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.cart_item_id === action.payload.cart_item_id);
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
          toast.info('Item quantity updated!'); // Notify update
        }
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = []; // Clear items in state when cart is cleared on the server
        state.totalPrice = 0;
         // Notify user
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error clearing cart: ${action.payload}`); // Notify error
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.cart_item_id !== action.payload.cart_item_id);
        toast.info('Item removed from cart!'); // Notify removal
      });
  },
});

export const { clearError } = cartSlice.actions;

export default cartSlice.reducer;
