import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CreateUser } from "./UserThunk";

export const Roles = {
    SELLER: 1,
    BUYER: 2
} as const;

export type Roles = typeof Roles[keyof typeof Roles];

export interface CreateUserDTO {
    email: string;
    username: string;
    phone: string;
    password: string;
    role: Roles;
    photo: File;
}

export interface UserDTO {
    id: number;
    email: string;
    username: string;
    phone: string;
    role: Roles;
    photo: File;
    authCompleted: boolean;
}
interface UserState {
    user: UserDTO | undefined;
    loading: boolean;
    errors: string[] | undefined;
}

const initialState: UserState = {
    user: undefined,
    loading: false,
    errors: []
};

const CreateUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CreateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateUser.fulfilled, (state, action : PayloadAction<UserDTO>) => {
            state.loading = false;
            state.user = action.payload; 
            state.errors = [];
        });

        builder.addCase(CreateUser.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
    }
});

export default CreateUserSlice.reducer;
