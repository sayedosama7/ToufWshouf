import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import languageSlice from './languageSlice';
import { FetchProductApi } from './Products/GetProductsApi';
import { RegisterApi } from './Register/RegisterApi';

export const store = configureStore({
    reducer: {
        language: languageSlice,
        [FetchProductApi.reducerPath]: FetchProductApi.reducer,
        [RegisterApi.reducerPath]: RegisterApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(FetchProductApi.middleware).concat(RegisterApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
