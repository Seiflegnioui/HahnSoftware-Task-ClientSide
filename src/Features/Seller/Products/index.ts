import { combineReducers } from "@reduxjs/toolkit";
import createProductReducer from "./Create/CreateProductSlice";
import getProductReducer from "./Show/GetProductSlice";
import ProductDetailsReducer from "./../../Buyer/Product/ProductDetailsSlice";
import type { SellerDTO } from "../Create/CreateSellerSlice";
import type { Categories } from "./Enums/Caterories";
import ReviewedProductReducer from "../../Buyer/Product/Reviewed/MarkReviewedSlice"

export const productReducer = combineReducers({
  create: createProductReducer,
  get: getProductReducer,
  details : ProductDetailsReducer,
  reviewed : ReviewedProductReducer
});

export interface ProductDTO {
  id: number;
  sellerId: number;
  name: string;
  seller?: SellerDTO; 
  description: string;
  category: Categories; 
  image: string;
  price: number;
  quantity: number;
  reviews: number;
  addedAt: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  category: Categories;
  image: File;
  price: number;
  quantity: number;
}