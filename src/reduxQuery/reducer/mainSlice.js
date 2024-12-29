// import { createSlice } from "@reduxjs/toolkit"
// import { persistReducer } from 'redux-persist'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { api } from "../services/api";

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage: AsyncStorage,
//     blacklist: [''],
// }

// const initialState = {
//     isLoggedIn: null,
// }


// export const mainSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loggedIn: (state, data) => {
//             console.log('fofo', data);
            
//             state.isLoggedIn = {
//                 token: data.payload.token,
//                 userType: data.payload.role
//             }
//         },
//         logout: (state) => {
//             state.isLoggedIn = null
//         },
//     },
// })

// export const { loggedIn, logout } = mainSlice.actions

// export default persistReducer(persistConfig, mainSlice.reducer)
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["isLoggedIn"], // Persist only the isLoggedIn field
};

const initialState = {
  isLoggedIn: null, // Stores the token and user info
};

export const mainSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      // console.log("state",state,'action',action.payload.user.id)
      state.isLoggedIn = {
        token: action.payload.token,
        userType: action.payload.role,
        userId: action.payload.user.id
      };
    },
    logout: (state) => {
      state.isLoggedIn = null; // Clear token and user data on logout
    },
  },
});

export const { loggedIn, logout } = mainSlice.actions;

export default persistReducer(persistConfig, mainSlice.reducer);
