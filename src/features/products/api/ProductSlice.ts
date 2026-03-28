import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
  fetchProducts
} from "./ProductService";;
import { ProductsResponse } from "../types/productType";
interface ProductState {
  products: ProductsResponse['products'];
  selectedProduct: ProductsResponse['products'][0] | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  isError: false,
  message: "",
};

export const fetchproduct = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    const data = await fetchProducts();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchproduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchproduct.fulfilled, (state, action) => {
        state.products = action.payload?.products || [];
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Failed to fetch products";
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;






       