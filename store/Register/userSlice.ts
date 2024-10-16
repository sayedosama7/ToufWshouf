import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    CustCode?: string;
    Email?: string;
    Token?: string;
}

const initialState: UserState = {
    CustCode: undefined,
    Email: undefined,
    Token: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.CustCode = action.payload.CustCode;
            state.Email = action.payload.Email;
            state.Token = action.payload.Token;
        },
        logoutUser: state => {
            state.CustCode = undefined;
            state.Email = undefined;
            state.Token = undefined;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
