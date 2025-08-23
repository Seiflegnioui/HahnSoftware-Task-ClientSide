import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ProductDetails } from "./ProductDetailsThunk";
import type { ProductDTO } from "../../Seller/Products";

interface ProductState {
  product: ProductDTO | null;
  loading: boolean;
  errors: string[];
}

const initialState: ProductState = {
  product: null,
  loading: false,
  errors: [],
};

const ProductDetailsSlice = createSlice({ 
  name: "details", 
  initialState,
  reducers: {
    // Optional: Add a clear action to reset the state
    clearProductDetails: (state) => {
      state.product = null;
      state.loading = false;
      state.errors = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ProductDetails.pending, (state) => {
      state.loading = true;
      state.errors = [];
    });
    builder.addCase(ProductDetails.fulfilled, (state, action: PayloadAction<ProductDTO>) => {
      console.log(action.payload);
      state.loading = false;
      state.product = action.payload;
      state.errors = [];
    });
    builder.addCase(ProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.errors = [action.payload || action.error.message || "Unknown error"];
    });
  },
});

export const { clearProductDetails } = ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;