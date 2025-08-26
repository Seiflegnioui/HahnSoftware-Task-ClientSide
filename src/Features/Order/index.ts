import { combineReducers } from "@reduxjs/toolkit";
import type { BuyerDTO } from "../Buyer/Create/CreateBuyerSlice"
import type { ProductDTO } from "../Seller/Products"
import sendOrderReducer from "../Order/Buyer/Create/SendOrderSlice"
import GetBuyerOrdersReducer from "../Order/Buyer/Get/GetBuyerOrdersSlice"
import GetSellerOrdersReducer from "../Order/Seller/Get/GetSellerOrderSlice"
import UpdateOrdersStateReducer from "../Order/Seller/UpdateState/UpdateStateSlice"

const orderReducer = combineReducers({
  send: sendOrderReducer,
  buyerOrders : GetBuyerOrdersReducer,
  sellerOrders : GetSellerOrdersReducer,
  updateOrderState : UpdateOrdersStateReducer
 
});


export interface SendOrderDTO {
      buyerId :number,
         productId :number,
     quantity:number
}

export interface OrderDTO {
            id:number,
          buyer  :BuyerDTO,
          product :ProductDTO,
          quantity:number,
          state : OrderState,
          addedAt :string

}

export interface OrderCountsDTO {
            ordersCount:number,
          recentOrdersCount  :number,


}


export const OrderState = {
       PENDING : 0,
        APPROVED : 1,
        REJECTED : 2
} as const;

export type OrderState = typeof OrderState[keyof typeof OrderState];
export default orderReducer;