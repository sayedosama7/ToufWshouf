import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import languageSlice from './languageSlice';
import { FetchProductApi } from './Products/GetProductsApi';
import { RegisterApi } from './Register/RegisterApi';
import { LoginApi } from './Register/LoginApi';
import { FetchImagesApi } from './Products/FetchImagesApi';
import { FetchDetailsApi } from './Products/FetchDetailsApi';
import { FetchReviewApi } from './Products/FetchReviewApi';
import { FetchSupplementApi } from './Products/FetchSupplementApi';
import { FetchTourIncludingApi } from './Products/FetchTourIncludingApi';
import { FetchPolicyApi } from './Products/FetchPolicyApi';
import { VerifyEmailApi } from './Register/VerifyEmailApi';
import { AddReviewApi } from './Products/AddReviewApi';
import userSlice from './Register/userSlice';
import { FetchProgramGroupsApi } from './Products/FetchProgramGroupsApi';
import { FetchGroupPriceApi } from './Products/FetchGroupPriceApi';
import { FetchExtraApi } from './Products/FetchExtraApi';
import { AddReservationApi } from './Reservation/AddReservationApi';
import { AddExtraApi } from './Reservation/AddExtraApi';
import { AddReservationDetailsApi } from './Reservation/AddReservationDetailsApi';
import { FetchPaymentApi } from './Reservation/FetchPaymentApi';
import { FetchForgetPassDataApi } from './ForgetPassword/FetchForgetPassDataApi';
import { VerifyPasswordApi } from './ForgetPassword/VerifyPasswordApi';
import { ResetPasswordApi } from './ForgetPassword/ResetPasswordApi';
import { FetchNationalityApi } from './Filter/FetchNationalityApi';
import  wishlistSlice  from './wishlistSlice';

export const store = configureStore({
    reducer: {
        language: languageSlice,
        user: userSlice,
        wishlist: wishlistSlice,
        [FetchProductApi.reducerPath]: FetchProductApi.reducer,
        [RegisterApi.reducerPath]: RegisterApi.reducer,
        [LoginApi.reducerPath]: LoginApi.reducer,
        [FetchImagesApi.reducerPath]: FetchImagesApi.reducer,
        [FetchDetailsApi.reducerPath]: FetchDetailsApi.reducer,
        [FetchReviewApi.reducerPath]: FetchReviewApi.reducer,
        [FetchSupplementApi.reducerPath]: FetchSupplementApi.reducer,
        [FetchTourIncludingApi.reducerPath]: FetchTourIncludingApi.reducer,
        [FetchPolicyApi.reducerPath]: FetchPolicyApi.reducer,
        [VerifyEmailApi.reducerPath]: VerifyEmailApi.reducer,
        [AddReviewApi.reducerPath]: AddReviewApi.reducer,
        [FetchProgramGroupsApi.reducerPath]: FetchProgramGroupsApi.reducer,
        [FetchGroupPriceApi.reducerPath]: FetchGroupPriceApi.reducer,
        [FetchExtraApi.reducerPath]: FetchExtraApi.reducer,
        [AddReservationApi.reducerPath]: AddReservationApi.reducer,
        [AddExtraApi.reducerPath]: AddExtraApi.reducer,
        [AddReservationDetailsApi.reducerPath]: AddReservationDetailsApi.reducer,
        [FetchPaymentApi.reducerPath]: FetchPaymentApi.reducer,
        [FetchForgetPassDataApi.reducerPath]: FetchForgetPassDataApi.reducer,
        [ResetPasswordApi.reducerPath]: ResetPasswordApi.reducer,
        [VerifyPasswordApi.reducerPath]: VerifyPasswordApi.reducer,
        [FetchNationalityApi.reducerPath]: FetchNationalityApi.reducer,
        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(FetchProductApi.middleware)
            .concat(RegisterApi.middleware)
            .concat(LoginApi.middleware)
            .concat(FetchImagesApi.middleware)
            .concat(FetchDetailsApi.middleware)
            .concat(FetchReviewApi.middleware)
            .concat(FetchSupplementApi.middleware)
            .concat(FetchTourIncludingApi.middleware)
            .concat(FetchPolicyApi.middleware)
            .concat(VerifyEmailApi.middleware)
            .concat(AddReviewApi.middleware)
            .concat(FetchProgramGroupsApi.middleware)
            .concat(FetchGroupPriceApi.middleware)
            .concat(FetchExtraApi.middleware)
            .concat(AddReservationApi.middleware)
            .concat(AddExtraApi.middleware)
            .concat(AddReservationDetailsApi.middleware)
            .concat(FetchPaymentApi.middleware)
            .concat(FetchForgetPassDataApi.middleware)
            .concat(ResetPasswordApi.middleware)
            .concat(VerifyPasswordApi.middleware)
            .concat(FetchNationalityApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
