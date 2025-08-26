import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductDTO } from "..";
import { DeleteProduct, GetProduct } from "./GetProductThunk";

interface ProductState {
  products: ProductDTO[] | null;
  loading: boolean;
  errors: string[];
}

const initialState: ProductState = {
  products: null,
  loading: false,
  errors: [],
};

const ProductSlice = createSlice({
  name: "product", 
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(GetProduct.pending, (state) => {
      state.loading = true;
      state.errors = [];
    });
    builder.addCase(GetProduct.fulfilled, (state, action: PayloadAction<ProductDTO[]>) => {
      state.loading = false;
      state.products = action.payload;
      state.errors = [];
    });
    builder.addCase(GetProduct.rejected, (state, action) => {
      state.loading = false;
      state.errors = [action.payload || action.error.message || "Unknown error"];
    });

    builder.addCase(DeleteProduct.pending, (state) => {
      state.loading = true;
      state.errors = [];
    });
    builder.addCase(DeleteProduct.fulfilled, (state, action: PayloadAction<ProductDTO>) => {
      state.loading = false;      
      if (state.products) {

        state.products = state.products.filter(product => product.id !== action.payload.id);
      }
      state.errors = [];
    });
    builder.addCase(DeleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.errors = [action.payload || action.error.message || "Unknown error"];
    });
  },
});

export default ProductSlice.reducer;