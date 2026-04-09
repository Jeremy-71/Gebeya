import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart as fetchCartAPI } from "../api/CartService";

const initialState = {
  carts: [],
  selectedCart: null,

  isLoading: false,
  isError: false,
  message: "",
};

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, thunkAPI) => {
//     try {
//       const data = await fetchCartAPI();
//       return data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error?.message || "Failed to fetch carts"
//       );
//     }
//   }
// );

export const fetchcart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    const data = await fetchCartAPI();
    return data;
  }
);


 const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedCart: (state, action) => {
      state.selectedCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchcart.fulfilled, (state, action) => {
        state.carts = action.payload?.carts || [];
        state.isLoading = false;
      })
     .addCase(fetchcart.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload as string;
});
  },
});

export const { setSelectedCart } = cartSlice.actions;

export default cartSlice.reducer; 