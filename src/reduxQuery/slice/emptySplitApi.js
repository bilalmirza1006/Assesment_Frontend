// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { logout } from '../reducer/mainSlice';
// import { store } from '../store'
// // import { BASE_URL } from './baseurl'
// // console.log('url', BASE_URL);

// export const emptySplitApi = createApi({
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: "http://localhost:5000/api",
//     //prepare headers work need to be done
//     prepareHeaders : async (headers, {getState}) => {
//       try{
//         // const isToken = store.getState().user.isLoggedIn
//         const token = (getState()).user;
//         // store.dispatch(createApi.util.resetApiState())
//         if (token) {
//           headers.set('authorization', `Bearer ${token.isLoggedIn.token}`)
//         } else {
//           store.dispatch(logout())
//           headers.set('authorization', '')
//         }
//       } catch(err) {
//         console.log('fofo', err);
        
//         headers.set('authorization', '')
//       }
//       return headers
//     },
//    }),
//   endpoints: () => ({}),
//   tagTypes: ['User', 'blog'],
// })
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../reducer/mainSlice";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      try {
        const token = getState()?.user?.isLoggedIn?.token; // Access token from state
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          console.log("Headers prepared with token:", token);
        } else {
          console.warn("Authorization header not set: Token missing in state");
          headers.set("Authorization", "");
          logout(); // Optionally log the user out if token is missing
        }
      } catch (err) {
        console.error("Error preparing headers:", err);
        headers.set("Authorization", "");
      }
      return headers;
    },
  }),
  endpoints: () => ({}), // Empty slice; other APIs can extend this
  tagTypes: ["User", "Blog"],
});
