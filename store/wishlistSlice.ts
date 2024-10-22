import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
    items: any[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action: PayloadAction<any>) {
            state.items.push(action.payload);
            localStorage.setItem('wishlistItems', JSON.stringify(state.items));
        },
        removeFromWishlist(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.code !== action.payload);
            localStorage.setItem('wishlistItems', JSON.stringify(state.items));
        },
        setWishlist(state, action: PayloadAction<any[]>) {
            state.items = action.payload;
        },
    },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
