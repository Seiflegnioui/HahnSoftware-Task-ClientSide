import { createSlice } from "@reduxjs/toolkit";
import type { ProductDTO } from "../../../Seller/Products";
import { ReviewProduct } from "./MarkReviewedThunk";

interface ProductReviewedState {
  loading: boolean;
  errors: string[];
  product: ProductDTO | null;
}

const initialState: ProductReviewedState = {
  loading: false,
  errors: [],
  product: null,
};

const ProductReviewedSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ReviewProduct.pending, (state) => {
        state.loading = true;
        state.errors = [];
        state.product = null;
      })
      .addCase(ReviewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.errors = [];
      })
      .addCase(ReviewProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.errors = action.payload ? [action.payload] : ["Failed to mark product as reviewed"];
      });
  },
});

export default ProductReviewedSlice.reducer;