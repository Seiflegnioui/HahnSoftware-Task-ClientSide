import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CreateProduct } from './CreateProductThunk';
import type { ProductDTO } from "..";



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

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      CreateProduct.fulfilled,
      (state, action: PayloadAction<ProductDTO>) => {
        state.loading = false;
        state.product = action.payload;
        state.errors = [];
      }
    );
    builder.addCase(CreateProduct.rejected, (state, action) => {
      state.loading = false;
      state.errors = [
        action.payload ?? action.error.message ?? "Unknown error",
      ];
    });
  },
});

export default ProductSlice.reducer;
