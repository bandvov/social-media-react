import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [
      {
        id: 1,
        content:
          "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
        authorName: "test test",
        dateCreated: Date.now(),
      },
      {
        id: 2,
        content: "test",
        authorName: "test",
        dateCreated: Date.now(),
      },
      {
        id: 3,
        content: "test",
        authorName: "test",
        dateCreated: Date.now(),
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
