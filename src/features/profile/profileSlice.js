import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {
      first_name: "",
      created_at: Date.now(),
      email: "bla@bla.test",
      followers_count: 122,
      followees_count: 342,
      posts_count: 88,
      bio: "bla bla some bio",
    },
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
    fetchProfileRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchProfilePostsRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchProfilePostssuccess: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, ...action.payload.posts];
      state.hasMorePosts = action.payload.hasMore;
      state.page += 1;
    },
    fetchProfilePostsfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProfileRequest,
  updateProfileRequest,
  success,
  failure,
  fetchProfilePostsRequest,
  fetchProfilePostssuccess,
  fetchProfilePostsfailure,
} = profileSlice.actions;
export default profileSlice.reducer;
