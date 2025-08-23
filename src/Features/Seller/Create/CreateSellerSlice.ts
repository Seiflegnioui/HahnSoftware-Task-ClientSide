import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Sources } from "./Enums";
import { CreateSeller } from "./CreateSellerThunk";

export interface CreateSellerDTO {
    shopName:string,
    shopLogo : File | null,
    shopDescription: string,
    adress : {country:string,city:string,adress:string},
    hasLocal: boolean,
    localAdress: {country:string,city:string,adress:string},
    field: string,
    personalSite: string|null,
    facebook: string | null,
    instagram : string | null,
    mySource : Sources

} 


export interface SellerDTO {
    id:number,
    userId : number,
    shopName:string,
    shopLogo : string,
    shopeDescription: string,
    adress : {country:string,city:string,adress:string},
    hasLocal: boolean,
    localAdress: {country:string,city:string,adress:string},
    field: string,
    personalSite: string|null,
    facebook: string | null,
    instagram : string | null,
    mySource : Sources,
    email:string,
    rating:number,
    username:string,
    photo:string,
    joinedAt:string
} 

interface SellerState {
    seller: SellerDTO | undefined;
    loading: boolean;
    errors: string[];
}

const initialState: SellerState = {
    seller: undefined,
    loading: false,
    errors: []
};

const SellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CreateSeller.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateSeller.fulfilled, (state, action : PayloadAction<SellerDTO>) => {
            state.loading = false;
            state.seller = action.payload; 
            state.errors = [];
        });

        builder.addCase(CreateSeller.rejected, (state, action) => {
            state.loading = false;
            state.errors = [action.error.message ?? "Unknown error"];
        });
    }
});

export default SellerSlice.reducer;
