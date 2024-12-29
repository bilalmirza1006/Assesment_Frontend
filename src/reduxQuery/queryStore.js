// import { configureStore } from "@reduxjs/toolkit";
// // import authReducer from "./slice/authSlice"; // Adjust the path based on your folder structure
// import { authApi } from "./slice/authApi";
// import mainReducer from './reducer/mainSlice'

// const queryStore = configureStore({
//   reducer: {
//     user:mainReducer,
//     // auth: authReducer,
//     [authApi.reducerPath]: authApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware), // Add authApi middleware
// });

// export default queryStore;


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { authApi } from "./slice/authApi";
import mainReducer from "./reducer/mainSlice"; // Persisted reducer

const queryStore = configureStore({
  reducer: {
    user: mainReducer, // Include the persisted reducer
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist
    }).concat(authApi.middleware), // Add middleware
});

export const persistor = persistStore(queryStore); // Create a persistor for the store

export default queryStore;

