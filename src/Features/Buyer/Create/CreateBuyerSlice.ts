import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Sources } from "../../Seller/Create/Enums";
import { CreateBuyer } from './CreateBuyerThunk';


export interface CreateBuyerDTO {
    birthdate:string,
    bio : string ,
    adress : {country:string,city:string,adress:string},
    mySource : Sources

} 

export interface BuyerDTO {
    id:number,
    userId : number,
    bio:string ,
    adress : {country:string,city:string,adress:string},
    mySource : Sources,
    birthDate : string,
    
    JoinedAt : Date,

    username:string,
    email:string,
    photo:string
} 

interface BuyerState {
    buyer: BuyerDTO | undefined;
    loading: boolean;
    errors: string[] | undefined;
}

const initialState: BuyerState = {
    buyer: undefined,
    loading: false,
    errors: []
};

const BuyerSlice = createSlice({
    name: "buyer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CreateBuyer.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateBuyer.fulfilled, (state, action : PayloadAction<BuyerDTO>) => {
            state.loading = false;
            state.buyer = action.payload; 
            state.errors = [];
        });

        builder.addCase(CreateBuyer.rejected, (state, {payload}) => {
            state.loading = false;
            state.errors = payload;
        });
    }
});

export default BuyerSlice.reducer;
