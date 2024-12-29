import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { authApi } from "../reduxQuery/slice/authApi";

export const store = configureStore({
  reducer: {
    //for redux toolkit
    auth: authReducer,

    // for redux toolkit query
    // [authApi.reducerPath]: authApi.reducer,

  },
});
