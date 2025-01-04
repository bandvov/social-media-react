import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [
      {
        id: 1,
        content:
          "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        author_name: "test test",
        created_at: Date.now(),
      },
      {
        id: 2,
        content: "test",
        author_name: "test",
        created_at: Date.now(),
      },
      {
        id: 3,
        content: "test",
        author_name: "test",
        created_at: Date.now(),
      },
    ],
  },
  reducers: {
    postsRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    success: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, ...action.payload.posts];
      state.hasMorePosts = action.payload.hasMore;
      state.page += 1;
    },
    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postsRequest, success, failure } = postsSlice.actions;
export default postsSlice.reducer;
