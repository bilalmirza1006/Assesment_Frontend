import { emptySplitApi } from "./emptySplitApi";

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/posts",
      providesTags: ["Blog"], // This ensures `getBlogs` provides a tag to be invalidated later
    }),
    getUsers: builder.query({
      query: () => "/users/",
    }),
    getPostById: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: ["Blog"], // This ensures `getPostById` provides a tag to be invalidated later
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    addBlog: builder.mutation({
      query: (blogData) => ({
        url: "/posts",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["Blog"], // Invalidate the `Blog` tag so `getBlogs` refetches
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}`, // Dynamic URL based on post ID
        method: 'PUT',       // HTTP method
        body: data,          // Payload
      }),
      invalidatesTags: ['Blog'], // Invalidate cached queries tagged with 'Blog'
    }),

  }),
});

export const {
  useGetBlogsQuery,
  useGetUsersQuery,
  useGetPostByIdQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddBlogMutation,
  useUpdatePostMutation,
} = authApi;
